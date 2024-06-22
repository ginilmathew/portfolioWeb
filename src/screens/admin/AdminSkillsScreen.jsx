import React, { useCallback, useState } from 'react'
import CustomOutletBox from '../../components/common/CustomOutletBox'
import useModal from '../../components/common/modalHook';
import { delteEducation, getEducationList } from '../../api/education';
import { Box, Stack, Tooltip } from '@mui/material';
import { ICONS } from '../../assets/icons';
import CustomAddButton from '../../components/common/CustomAddButton';
import DataTable from '../../components/common/CustomTable';
import CustomDelete from '../../components/common/CustomDelete';
import { useQuery } from '@tanstack/react-query';
import EducationForm from '../../components/common/admin/education/EducationForm';
import SkillForm from '../../components/common/admin/skills/SkillForm';
import { delteSkill, getAllSkill } from '../../api/skill';

const AdminSkillsScreen = () => {
  const { modal, openModal, closeModal } = useModal();
  const { data, isError, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['getSkills'],
    queryFn: getAllSkill,
  });

  const [item, setItem] = useState(null);
  const [_id, set_id] = useState(null);
  const OpenDelete = useCallback((id) => {
    set_id(id);
    openModal('deleteModal');
  }, [modal]);

  const closeDelete = useCallback(() => {
    closeModal('deleteModal');
  }, [modal]);

  const openAdd = useCallback(() => {
    openModal('addModal');
  }, [modal]);

  const closeAdd = useCallback(() => {
    closeModal('addModal');
  }, [modal]);

  const openEdit = useCallback((item) => {
    setItem(item)
    openModal('editModal');
  }, [modal]);

  const closeEdit = useCallback(() => {

    closeModal('editModal');
  }, [modal,]);

  const openView = useCallback((item) => {
    setItem(item)
    openModal('viewModal');
  }, [modal]);

  const closeView = useCallback(() => {

    closeModal('viewModal');
  }, [modal]);


  const columns = [

    {
      field: 'SN',
      headerName: 'SN',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1

    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'proficiency',
      headerName: 'proficiency',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Action',
      headerName: 'Action',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Stack alignItems={ 'center' } gap={ 1 } direction={ 'row' } sx={ { justifyContent: 'center' } }>
          <Box onClick={ () => {
            setItem(null);
            openView(row);
          } }>
            <Tooltip title={ 'view' }>
              <ICONS.RemoveRedEyeIcon.component sx={ ICONS.RemoveRedEyeIcon.sx } />
            </Tooltip>
          </Box>

          <Tooltip title={ 'edit' }>
            <Box onClick={ () => {
              setItem(null);
              openEdit(row);
            } }>
              <ICONS.BorderColorIcon.component sx={ ICONS.BorderColorIcon.sx } />
            </Box>
          </Tooltip>
          <Tooltip title={ 'delete' }>
            <Box onClick={ () => {

              OpenDelete(row?._id);
            } }>
              <ICONS.DeleteForeverIcon.component sx={ ICONS.DeleteForeverIcon.sx } />
            </Box>
          </Tooltip>
        </Stack>
      ),
    }
  ];

  return (
    <CustomOutletBox>
      <CustomAddButton ClickEvent={ openAdd } label={ 'Akldd' } justifyContent={ 'flex-end' } />
      <DataTable
        rows={ data?.data?.data || [] }
        columns={ columns }
        id={ "_id" }
      />
      { modal.deleteModal && <CustomDelete
        open={ modal.deleteModal }
        onClose={ closeDelete }
        heading={ 'Skill' }
        paragraph={ 'Skill' }
        fun={ delteSkill }
        _id={ _id }
        fetch={ 'getSkills' } /> }

      { modal.addModal && <SkillForm open={ modal.addModal } close={ closeAdd } label={ 'Create Skill' } hide={ false } id={ false } /> }
      { modal.editModal && <SkillForm open={ modal.editModal } close={ closeEdit } label={ 'Edit Skill' } hide={ false } id={ false } item={ item } /> }
      { modal.viewModal && <SkillForm open={ modal.viewModal } close={ closeView } label={ 'View Skill' } hide={ true } id={ false } item={ item } /> }

    </CustomOutletBox>
  )
}

export default AdminSkillsScreen