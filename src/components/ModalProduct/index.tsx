import {useState, useCallback, useImperativeHandle, forwardRef} from 'react';
import {Wrapper} from './styles';
import {
  AiOutlineCloseCircle as CloseIcon,
  AiOutlineClose as OutlineCloseIcon,
} from 'react-icons/ai';

export interface IModalProductsHandles {
  openModal: () => void;
}

interface IModalProductsProps {
  title?: string;
}

const ModalProduct: React.ForwardRefRenderFunction<
  IModalProductsHandles,
  IModalProductsProps
> = ({title}, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImagesPreview, setProductImagesPreview] =
    useState<string[]>([]);

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

  function handleProcessImages(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;

    if (fileList) {
      const arrayFiles = Array.from(fileList).map((file) => file);

      setProductImages(arrayFiles);
      
      const objectUrlList = arrayFiles.map((file) => {
        return URL.createObjectURL(file);
      });

      setProductImagesPreview((prevState) => [...prevState, ...objectUrlList]);
    }
  }

  function handleRemoveImage(indexOfImage: number) {
    setProductImagesPreview((prevState) =>
      productImagesPreview.filter((image) =>
        image !== prevState[indexOfImage]
      )
    );
  }

  return visible ? (
    <Wrapper>
      <div>
        <h1>Adicionar novo produto</h1>
        <CloseIcon color="#39D183" size={25} onClick={closeModal} />
        <form>
          <div>
            <input
              type="text"
              name="name"
              autoComplete="false"
              autoCorrect="false"
              placeholder="Nome do produto"
            />
            <input
              type="text"
              autoComplete="false"
              autoCorrect="false"
              name="price"
              placeholder="Valor"
            />
          </div>

          <div>
            <select required name="category">
              <option disabled hidden value="Categoria">Categoria</option>
              <option value="Natura">Natura</option>
              <option value="Tapetes">Tapetes</option>
              <option value="Kits">Kits</option>
              <option value="Cama mesa e banho">Cama mesa e banho</option>
            </select>
            <input
              type="text"
              autoComplete="false"
              autoCorrect="false"
              name="amount"
              placeholder="Unidades"
            />
          </div>

          <div>
            <textarea name="description" placeholder="Descrição do produto"></textarea>
          </div>

          <div>
            <div>
              <input
                type="file"
                id="images[]"
                name="images[]"
                multiple
                onChange={handleProcessImages}
              />
              <label htmlFor="images[]">Adicionar imagens</label>
            </div>
          </div>

          <div>
            {
              productImagesPreview.length !== 0
                ? productImagesPreview.map((image, index) => (
                    <div key={image}>
                      <img src={image} alt="Product" />
                      <OutlineCloseIcon
                        color="#EB5858"
                        size={20}
                        onClick={() => handleRemoveImage(index)}
                      />
                    </div>
                  ))
                : null
            }
          </div>

          <button type="submit">Confirmar</button>
        </form>
      </div>
    </Wrapper>
  ) : null;
}

export default forwardRef(ModalProduct);
