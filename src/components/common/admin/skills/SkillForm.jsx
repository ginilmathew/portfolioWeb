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
import CustomSelect from '../../CustomSelect';
import { LEVEL_TYPE } from '../../../../constant';
import { createSkill, updateSkill } from '../../../../api/skill';
import CustomBackDrop from '../../CustomBackDrop';

const SkillForm = ({ close, open, label, hide, item, btnLabel, data }) => {




  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();
  const [type, setType] = useState('')



  const schema = object().shape({
    name: yup.string().required('Required'),
    proficiency: yup.string().required('Required'),
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
      setType(item?.proficiency)
    }
  }, [item]);

  const { mutate, isPending } = useMutation({
    mutationFn: item ? updateSkill : createSkill,
    onSuccess: async (data) => {
      reset()
      showSnackbar(item ? 'Updated Successfully' : 'Created Successfully', 'success');
      await queryClient.invalidateQueries({ queryKey: ["getSkills"] })
      close()
    },
    onError: (error, variables, context) => {
      showSnackbar(error?.message, 'error');
    },
  });


  const onChangeType = useCallback((e) => {
    const { value } = e.target;
    setType(value);
    setValue('proficiency', value);
    setError('proficiency', '');
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
            fieldLabel="Skill Name"
          />
        </Grid>
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
          <CustomSelect
            view={ hide }
            control={ control }
            error={ errors.proficiency }
            fieldName="proficiency"
            fieldLabel="Skill Level"
            size="16px"
            onChangeValue={ onChangeType }
            value={ type }
          >
            <MenuItem value="" disabled >
              <em>Select Level</em>
            </MenuItem>
            { LEVEL_TYPE && LEVEL_TYPE.map((res, i) => (
              <MenuItem key={ res?.id } value={ res.value } >
                { res?.value }
              </MenuItem>
            )) }

          </CustomSelect>
        </Grid>
        { isPending && <CustomBackDrop loading={ isPending } /> }
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

    </CustomModal>
  )
}

export default SkillForm