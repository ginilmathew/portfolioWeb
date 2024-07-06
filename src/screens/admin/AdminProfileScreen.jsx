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
import CustomBackDrop from '../../components/common/CustomBackDrop'
const AdminProfileScreen = ({ hide }) => {


  const { data, isLoading } = useQuery({ queryKey: ['getProfile'], queryFn: getuser });


  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');


  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: async (data) => {
      const jsonData = JSON.stringify(data?.data?.data);
      localStorage.setItem('user', jsonData)
      showSnackbar('Updated Successfully', 'success');
      await queryClient.invalidateQueries({ queryKey: ["getProfile"] })

    },
    onError: (error, variables, context) => {
      showSnackbar(error?.message, 'error');
    },
  });



  const schema = object().shape({
    email: yup.string().required('Required')
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
      setPreviewUrl(data?.data?.profileImg)
      reset(data?.data)
    }
  }, [data?.data])




  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setValue("profileImg", reader.result)
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('');
    }
  };


  const submitForm = (dataForm) => {
    const formData = new FormData();

    // Append each field from your JSON data
    formData.append('_id', dataForm._id);
    formData.append('username', dataForm.username);
    formData.append('fullname', dataForm.fullname);
    formData.append('email', dataForm.email);
    formData.append('bio', dataForm.bio);
    formData.append('experience', dataForm.experience);
    formData.append('address', dataForm.address);
    formData.append('alternative_no', dataForm.alternative_no);
    formData.append('mobile', dataForm.mobile);
    formData.append('designation', dataForm.designation);
    formData.append('role', dataForm.role);

    // Check if selectedFile exists and append it as profileImg
    if (selectedFile) {
      formData.append('profileImg', dataForm.profileImg);
    }
    mutate(formData)
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
          </Grid>
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
        { isLoading && <CustomBackDrop loading={ isLoading } /> }
      </Box>
    </CustomOutletBox>
  )
}

export default AdminProfileScreen