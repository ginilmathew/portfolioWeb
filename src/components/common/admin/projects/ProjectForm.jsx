import React, { useCallback, useEffect, useState } from 'react'
import { Box, Grid, MenuItem, Typography } from '@mui/material'
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
import CustomTextArea from '../../CustomTextArea';
import CustomMultiSelect from '../../CustomMultiSelect';
import { LEVEL_TYPE } from '../../../../constant';
import { createproject, updateproject } from '../../../../api/project';
import CustomBackDrop from '../../CustomBackDrop';

const ProjectForm = ({ close, open, label, hide, item, btnLabel, data }) => {


  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();

  const [type, setType] = useState([])

  const schema = object().shape({
    name: yup.string().required('Required'),
    details: yup.string().required('Required'),

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
      let mapped = item?.technology_used?.map((res) => res?._id)
      setType(mapped)
      setValue('technology_used', mapped)
    }
  }, [item]);

  const { mutate, isPending } = useMutation({
    mutationFn: item ? updateproject : createproject,
    onSuccess: async (data) => {
      reset()
      showSnackbar(item ? 'Updated Successfully' : 'Created Successfully', 'success');
      await queryClient.invalidateQueries({ queryKey: ["projectList"] })
      close()
    },
    onError: (error, variables, context) => {
      showSnackbar(error?.message, 'error');
    },
  });
  const onChangeType = useCallback((e) => {
    const { value } = e.target;
    setValue('technology_used', value)
    setType(value);

  }, [type]);


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
            fieldLabel="Project Name"
          />
        </Grid>
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
          <CustomMultiSelect
            view={ hide }
            control={ control }
            error={ errors.technology_used }
            fieldName="technology_used"
            fieldLabel="Technology Used"
            size="16px"
            onChangeValue={ onChangeType }
            value={ type }
          >

            { data && data?.map((option) => (
              <MenuItem key={ option._id } value={ option._id }>
                { option.name }
              </MenuItem>
            )) }

          </CustomMultiSelect>
        </Grid>
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
          <CustomTextArea
            readOnly={ true }
            control={ control }
            error={ errors.details }
            fieldName="details"
            multiline={ true }
            height={ 90 }
            row={ 10 }
            fieldLabel="About Project"
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

export default ProjectForm