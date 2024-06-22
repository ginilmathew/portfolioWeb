import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEducation, updateEducation } from '../../../../api/education';
import CustomModal from '../../CustomModal';
import CustomButton from '../../CustomButton';
import { useSnackbar } from '../../../../hooks/SnackBar';
import CustomInput from '../../CustomInput';
import CustomBackDrop from '../../CustomBackDrop';

const EducationForm = ({ close, open, label, hide, item, btnLabel }) => {




  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();




  const schema = object().shape({
    name: yup.string().required('Required'),
    course: yup.string().required('Required'),
    place: yup.string().required('Required'),
    presentDate: yup.string().required('Required'),
    marks_percentage: yup.string().required('Required'),
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
    if (item) {
      reset(item)
    }
  }, [item]);

  const { mutate, isPending } = useMutation({
    mutationFn: item ? updateEducation : createEducation,
    onSuccess: async (data) => {
      reset()
      showSnackbar(item ? 'Updated Successfully' : 'Created Successfully', 'success');
      await queryClient.invalidateQueries({ queryKey: ["educationlist"] })
      close()
    },
    onError: (error, variables, context) => {
      showSnackbar(error?.message, 'error');
    },
  });



  const SubmitForm = (data) => {
    mutate(data)
  }

  return (
    <CustomModal close={ close } open={ open } label={ label } width={ 'sm' } btnLabel={ btnLabel } block={ true }>
      <Grid container spacing={ 2 }>
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
          <CustomInput
            placeholder={ '' }
            readonly={ hide }
            control={ control }
            error={ errors.name }
            fieldName="name"
            fieldLabel="Academic Name"
          />
        </Grid>
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
          <CustomInput
            placeholder={ '' }
            readonly={ hide }
            control={ control }
            error={ errors.course }
            fieldName="course"
            fieldLabel="Course"
          />
        </Grid>
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
          <CustomInput
            placeholder={ '' }
            readonly={ hide }
            control={ control }
            error={ errors.place }
            fieldName="place"
            fieldLabel="Place"
          />
        </Grid>
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
          <CustomInput
            placeholder={ '' }
            readonly={ hide }
            control={ control }
            error={ errors.presentDate }
            fieldName="presentDate"
            fieldLabel="From To Date (eg:2000)"
          />
        </Grid>
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
          <CustomInput
            placeholder={ '' }
            readonly={ hide }
            control={ control }
            error={ errors.marks_percentage }
            fieldName="marks_percentage"
            fieldLabel="Mark (% / CGPA)"
          />
        </Grid>
      </Grid>
      { !hide &&
        <Box px={ 20 } py={ 4 } >
          <CustomButton
            onClick={ handleSubmit(SubmitForm) }
            width="100%"
            label={ item ? 'Update' : 'Save' }
            isIcon={ false }
          />
        </Box> }
      { isPending && <CustomBackDrop loading={ isPending } /> }
    </CustomModal>
  )
}

export default EducationForm