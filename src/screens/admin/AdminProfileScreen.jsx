import React, { useEffect, useState } from 'react'
import CustomOutletBox from '../../components/common/CustomOutletBox'
import CustomAddButton from '../../components/common/CustomAddButton'
import { Box, Grid } from '@mui/material'
import CustomInput from '../../components/common/CustomInput'
import CustonImageUpload from '../../components/common/CustomFileUpload'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from '../../hooks/SnackBar'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import CustomTextArea from '../../components/common/CustomTextArea'
import { getuser, updateUser } from '../../api/user'
const AdminProfileScreen = ({ hide }) => {
  const { data } = useQuery({ queryKey: ['getProfile'], queryFn: getuser });


  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [clodinaryUrl, setCloudinaryUrl] = useState('')

  const schema = object().shape({

  });



  const {
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {

    }

  });


  useEffect(() => {
    if (data?.data) {
      reset(data?.data)
    }
  }, [data?.data])


  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: async (data) => {
      showSnackbar('Updated Successfully', 'success');
      await queryClient.invalidateQueries({ queryKey: ["getProfile"] })

    },
    onError: (error, variables, context) => {
      showSnackbar(error?.message, 'error');
    },
  });



  // const handleFileInputChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewUrl(reader.result);
  //       setValue("profileImg", reader.result)
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setPreviewUrl('');
  //   }
  // };


  const submitForm = (dataForm) => {
    mutate(dataForm)
  }
  return (
    <CustomOutletBox>
      <CustomAddButton ClickEvent={ handleSubmit(submitForm) } label={ 'Update' } justifyContent={ 'flex-end' } />
      <Box px={ 2 } py={ 1 }>
        <Grid container spacing={ 2 }>
          <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
            <CustomInput
              readonly={ hide }
              control={ control }
              error={ errors.username }
              fieldName="username"
              fieldLabel="User Name"
            />
          </Grid>
          <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
            <CustomInput
              readonly={ hide }
              control={ control }
              error={ errors.fullname }
              fieldName="fullname"
              fieldLabel="Full Name"
            />
          </Grid>
          <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
            <CustomInput
              readonly={ hide }
              control={ control }
              error={ errors.email }
              fieldName="email"
              fieldLabel="Email"
            />
          </Grid>
          <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
            <CustomInput
              readonly={ hide }
              control={ control }
              error={ errors.experience }
              fieldName="experience"
              fieldLabel="Experience"
            />
          </Grid>

          {/* 
          <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 12 } xs={ 12 }>
            <CustonImageUpload
              fieldLabel={ 'Image Upload' }
              onChangeImage={ handleFileInputChange }
              imageFile={ selectedFile }
              previewUrl={ previewUrl }
              control={ control }
              error={ errors.profileImg }
              fieldName="profileImg"
            />
          </Grid> */}
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
            <CustomTextArea
              readOnly={ true }
              control={ control }
              error={ errors.bio }
              fieldName="bio"
              multiline={ true }
              height={ 90 }
              row={ 10 }
              fieldLabel="About Me"
            />
          </Grid>
        </Grid>
      </Box>
    </CustomOutletBox>
  )
}

export default AdminProfileScreen