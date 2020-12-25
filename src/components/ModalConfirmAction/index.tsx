import {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react';

import api from '../../services/api';

import {toastSuccess, toastError} from '../../config/toast';

import {Wrapper} from './styles';

export interface IModalConfirmActionHandles {
  openModal: () => void;
};

interface IModalConfirmActionProps {
  productId: number;
}

const ModalConfirmAction: React.ForwardRefRenderFunction<
  IModalConfirmActionHandles,
  IModalConfirmActionProps
> = ({productId}, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  async function handleRemoveProduct() {
    try {
      const response = await api.delete(`product/delete/${productId}`);

      if (response.status === 200) {
        toastSuccess('Produto excluído com sucesso!');
      }
    } catch (err) {
      const {error} = err.response.data;

      toastError(error);
    }
  }

  return visible ? (
    <Wrapper>
      <div>
        <p>Deseja confirmar a exclusão?</p>
        <p>obs: após a confirmação não será possível retornar com o registro.</p>
        <button onClick={handleRemoveProduct}>Confirmar</button>
        <button onClick={closeModal}>Cancelar</button>
      </div>
    </Wrapper>
  ) : null;
}

export default forwardRef(ModalConfirmAction);
