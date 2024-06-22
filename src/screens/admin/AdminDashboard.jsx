import React, { useCallback, useState } from 'react'
import CustomOutletBox from '../../components/common/CustomOutletBox'
import CustomAddButton from '../../components/common/CustomAddButton'
import useModal from '../../components/common/modalHook';
import { useQuery } from '@tanstack/react-query';
import { getEducationList } from '../../api/education';

const AdminDashboard = () => {
  const { modal, openModal, closeModal } = useModal();
  const { data, isError, isLoading, isFetched, refetch } = useQuery({ queryKey: ['academicget'], queryFn: getEducationList });
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



  return (
    <CustomOutletBox>
      <CustomAddButton ClickEvent={ openAdd } label={ 'Add' } justifyContent={ 'flex-end' } />

    </CustomOutletBox>
  )
}

export default AdminDashboard