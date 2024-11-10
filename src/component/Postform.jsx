import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import databaseservice from '../appwrite/database'
import RTE from './RTE'
import Input from './Input'
import Button from './Button'
const Postform = (post) => {
  const { register, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  });

  const navigate = useNavigate();
  const userdata = useSelector((state) => state.user.userData)

  const submit = async (data) => {
    //update the post
    if (post) {
      //handle the file first
      const file = data.image[0] ? await databaseservice.createfile(data.image[0]) : null
      if (file) {
        await databaseservice.deletefile(post.featuredimage)
      }
      const dbpost = await databaseservice.updatepost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined
      })
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`)
      }
      //new post
    } else {
      const file = await databaseservice.createfile(data.image[0])
      if (file) {
        const fileId = file.$id;
        data.featuredimage = fileId
        const dbpost = await databaseservice.createpost({ ...data, userId: userdata.$id })
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`)
        }
      }
    }
  }
  //slug transform
  const slugtransform = useCallback((value) => {
    if (value && typeof value === String) {
      const slug = value.toLoweCase().replace(/ /g, '-')
      setValue('slug', slug)
    } else {
      setValue('slug', '')
    }
  },[])
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugtransform(value.title))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugtransform, setValue])
  return (
    <div className="container mt-5">
      <h2 className="text-center">{post ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit(submit)} className="mt-4">
        <div className="mb-3">
          <Input
            type="text"
            placeholder="Enter Post Title"
            label="Title"
            {...register("title", { required: true })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <Input
            type="text"
            placeholder="Enter Slug"
            label="Slug"
            {...register("slug")}
            className="form-control"
            readOnly
          />
        </div>
        <div className="mb-3">
          <RTE
            control={control}
            name="content"
            label="Content"
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            {...register("image")}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select {...register("status")} className="form-select">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <Button type="submit" className="btn btn-primary">Submit</Button>
      </form>
    </div>
  )
}

export default Postform
