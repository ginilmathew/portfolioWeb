import React, { useCallback, useState } from 'react'
import CustomOutletBox from '../../components/common/CustomOutletBox'
import useModal from '../../components/common/modalHook';
import { delteEducation, getEducationList } from '../../api/education';
import { Box, Stack, Tooltip } from '@mui/material';
import { ICONS } from '../../assets/icons';
import CustomAddButton from '../../components/common/CustomAddButton';
import DataTable from '../../components/common/CustomTable';
import CustomDelete from '../../components/common/CustomDelete';
import { useQueries, useQuery } from '@tanstack/react-query';
import ProjectForm from '../../components/common/admin/projects/ProjectForm';
import { delteproject, getProjectList } from '../../api/project';
import { getAllSkill } from '../../api/skill';

const AdminProjectScreen = () => {
  const { modal, openModal, closeModal } = useModal();
  const data = useQueries({
    queries: [{ queryKey: ['projectList'], queryFn: getProjectList },
    { queryKey: ['getSkills'], queryFn: getAllSkill },

    ]
  }
  );


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
      field: 'details',
      headerName: 'About Project',
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
        rows={ data?.[0]?.data?.data?.data || [] }
        columns={ columns }
        id={ "_id" }
      />
      { modal.deleteModal && <CustomDelete
        open={ modal.deleteModal }
        onClose={ closeDelete }
        heading={ 'Project' }
        paragraph={ 'project' }
        fun={ delteproject }
        _id={ _id }
        fetch={ 'projectList' } /> }

      { modal.addModal && <ProjectForm open={ modal.addModal } close={ closeAdd } label={ 'Create Project' } hide={ false } id={ false } data={ data?.[1]?.data?.data?.data } /> }
      { modal.editModal && <ProjectForm open={ modal.editModal } close={ closeEdit } label={ 'Edit Project' } hide={ false } id={ false } item={ item } data={ data?.[1]?.data?.data?.data } /> }
      { modal.viewModal && <ProjectForm open={ modal.viewModal } close={ closeView } label={ 'View Project' } hide={ true } id={ false } item={ item } data={ data?.[1]?.data?.data?.data } /> }

    </CustomOutletBox>
  )
}

export default AdminProjectScreen