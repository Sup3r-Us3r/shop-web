import {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  FormEvent
} from 'react';
import {
  AiOutlineCloseCircle as CloseIcon,
  AiOutlineClose as OutlineCloseIcon,
  AiOutlineLoading3Quarters as LoadingIcon,
} from 'react-icons/ai';
import * as Yup from 'yup';

import {toastWarn, toastError, toastSuccess} from '../../config/toast';

import api from '../../services/api';

import {ICategory, IProduct} from '../../pages/Products';

import {Wrapper} from './styles';

export interface IModalProductsHandles {
  openModal: () => void;
}

interface IModalProductsProps {
  modalType: 'create' | 'update';
  categories: ICategory[];
  productData: IProduct;
  setProductData: React.Dispatch<React.SetStateAction<IProduct>>;
}

interface IProductImagesPreview {
  id: number;
  url: string;
}

const ModalProduct: React.ForwardRefRenderFunction<
  IModalProductsHandles,
  IModalProductsProps
> = ({modalType, categories, productData, setProductData}, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productImagesPreview, setProductImagesPreview] =
    useState<IProductImagesPreview[]>([]);
  const [productsToRemove, setProductsToRemove] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    handleResetFormFields();
    setProductData({} as IProduct);
  }, [setProductData]);

  useImperativeHandle(ref, () => {
    return {
      openModal,
    };
  });

  function handleResetFormFields() {
    setName('');
    setPrice('');
    setAmount('');
    setCategory('');
    setDescription('');
    setProductImages([]);
    setProductImagesPreview([]);
  }

  function handleProcessImages(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;

    if (fileList) {
      const arrayFiles = Array.from(fileList).map((file) => file);

      const objectUrlList = arrayFiles.map((file) => ({
        id: Math.random(),
        url: URL.createObjectURL(file),
      }));

      setProductImagesPreview((prevState) => [...prevState, ...objectUrlList]);
      setProductImages((prevState) => [...prevState, ...arrayFiles]);
    }
  }

  function handleRemoveImage(indexOfImage: number, idOfImage: number) {
    setProductImagesPreview(
      productImagesPreview.filter((_, index) => index !== indexOfImage)
    );

    setProductImages(
      productImages.filter((_, index) => index !== indexOfImage)
    );

    // Set image ids already stored in the database to remove from cloudinary
    const imageOfProductExits = productData.images
      .some((image) => image.id === idOfImage);

    if (imageOfProductExits) {
      setProductsToRemove(
        (prevState) => [...prevState, idOfImage]
      );
    }
  }

  function handleFieldsValidation(fields: object) {
    const validation = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      amount: Yup.number().required(),
      category: Yup.string().required(),
      description: Yup.string().required(),
      images: Yup.array().required(),
    });

    return validation.isValid(fields);
  }

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();

      setSubmitting(true);

      const data = {
        name,
        price: Number(price),
        amount: Number(amount),
        category,
        description,
        images: modalType === 'create'
          ? productImages.length !== 0
            ? productImages
            : undefined
          : productImages.length !== 0
            ? productImages
            : []
      }

      const fieldsValidation = await handleFieldsValidation(data);

      if (!fieldsValidation) {
        setSubmitting(false);

        return toastWarn('Todos os campos são obrigatórios!');
      }

      const formData = new FormData();

      formData.append('name', name);
      formData.append('price', price);
      formData.append('amount', amount);
      formData.append('category', category);
      formData.append('description', description);
      productImages
        .filter((image) => image.size !== 0)
        .forEach((image) => formData.append('images[]', image));

      if (modalType === 'create') {
        await api.post('product/create', formData);

        toastSuccess('Produto adicionado com sucesso!');

        handleResetFormFields();
      } else {
        await api.put(`product/update/${productData.id}`, formData, {
          params: {
            removeImages: productsToRemove.toString(),
          },
        });

        toastSuccess('Product atualizado com sucesso!');

        handleUpdateProductInformationAfterEditing();
      }

      setSubmitting(false);
    } catch (err) {
      const {error} = err.response.data;

      toastError(error);

      setSubmitting(false);
    }
  }

  const handleInsertProductDataOnFormFields = useCallback((data: IProduct) => {
    setName(data.name);
    setPrice(String(data.price));
    setAmount(String(data.amount));
    setCategory(data.category);
    setDescription(data.description);

    // Get all images url to set in preview and array of files
    const imagesUrl = data.images.map((image) => image.url);
    const imagesFakeFile = imagesUrl.map((image) => new File([], image));

    setProductImagesPreview(data.images);
    setProductImages(imagesFakeFile);
  }, []);

  async function handleUpdateProductInformationAfterEditing() {
    try {
      const response = await api.get<IProduct>(
        `product/show/${productData.id}`
      );

      if (response) {
        handleInsertProductDataOnFormFields(response.data);
      }
    } catch (err) {
      const {error} = err.response.data;

      toastError(error);
    }
  }

  useEffect(() => {
    if (productData.id) {
      handleInsertProductDataOnFormFields(productData);
    }
  }, [productData, handleInsertProductDataOnFormFields]);

  return visible ? (
    <Wrapper>
      <div>
        <h1>
          {
            modalType === 'create'
              ? 'Adicionar novo produto'
              : 'Atualizar produto'
          }
          </h1>
        <CloseIcon color="#39D183" size={25} onClick={closeModal} />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              autoComplete="false"
              autoCorrect="false"
              placeholder="Nome do produto"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="text"
              autoComplete="false"
              autoCorrect="false"
              name="price"
              placeholder="Valor"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div>
            <select
              required
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option disabled hidden value="">Categoria</option>
              {categories?.map((category) => (
                <option
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              autoComplete="false"
              autoCorrect="false"
              name="amount"
              placeholder="Unidades"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Descrição do produto"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>

          <div>
            <div>
              <input
                type="file"
                id="images[]"
                name="images[]"
                multiple
                accept="image/*"
                onChange={handleProcessImages}
              />
              <label htmlFor="images[]">Adicionar imagens</label>
            </div>
          </div>

          <div>
            {
              productImagesPreview.length !== 0
                ? productImagesPreview.map((image, index) => (
                    <div key={image.id}>
                      <img src={image.url} alt="Product" />
                      <OutlineCloseIcon
                        color="#EB5858"
                        size={20}
                        onClick={() => handleRemoveImage(index, image.id)}
                      />
                    </div>
                  ))
                : null
            }
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={submitting ? 'submitting' : ''}
          >
            {!submitting ? 'Confirmar' : (
              <LoadingIcon color="#FFF" size={20} />
            )}
          </button>
        </form>
      </div>
    </Wrapper>
  ) : null;
}

export default forwardRef(ModalProduct);
