import { Button, Flex, FormControl, FormHelperText, FormLabel, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, TableCaption, TableContainer, Tbody, Td, Textarea, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import DashboardProductsTableSkeleton from './DashboardProductsTableSkeleton'
import { useAddDashboardProductsMutation, useDeleteDashboardProductsMutation, useGetDashboardProductsQuery, useUpdateDashboardProductsMutation } from '../app/services/products'
import { AiOutlineEye } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import CustomAlertDialog from '../shared/AlertDialog'
import CustomModal from '../shared/Modal'
import { IoMdAdd } from "react-icons/io";
import { errorAddProductValidation } from '../validation'
import { useSelector } from 'react-redux'
import { selectNetwork } from '../app/features/networkSlice'

const DashboardProductsTable = () => {
	const [clickedProductId, setClickedProductId] = useState(null);
	const [productToEdit, setProductToEdit] = useState(null);
	const [thumbnail, setThumbnail] = useState(null);
	const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 })
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isOpenEditModal, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
	const { isOpen: isOpenAddModal, onOpen: onOpenAddModal, onClose: onCloseAddModal } = useDisclosure();
	const [destroyProduct, { isLoading: isDestroying, isSuccess }] = useDeleteDashboardProductsMutation()
	const [updateProduct, { isLoading: isUpdating, isSuccess: isUpdatingSuccess }] = useUpdateDashboardProductsMutation()
	const [addProduct, { isLoading: isAdding, isSuccess: isAddingSuccess }] = useAddDashboardProductsMutation()
	const {isOnline}=useSelector(selectNetwork);
	const [productToAdd, setProductToAdd] = useState({ title: "", description: "", price: 0, stock: 0 })
	const [errorVali, setErrorVali] = useState({ title: "", description: "", price: "", stock: "" })

	// Edit Function---------------->
	const onChangeEditHandler = (e) => {
		const { name, value } = e.target;
		setProductToEdit({
			...productToEdit,
			[name]: value
		})
	}

	const onChangeEditPriceHandler = value => {
		setProductToEdit({
			...productToEdit,
			price: +value,
		});
	};

	const onChangeEditStockHandler = value => {
		setProductToEdit({
			...productToEdit,
			stock: +value,
		});
	};

	const onChangeEditThumbnailHandler = (e) => {
		setThumbnail(e.target.files[0]);
	}

	const onSubmitEditHandler = () => {
		const formData = new FormData();
		formData.append(
			"data",
			JSON.stringify({
				title: productToEdit?.title,
				description: productToEdit?.description,
				price: productToEdit?.price,
				stock: productToEdit?.stock,
			})
		)
		formData.append("files.thumbnail", thumbnail)
		updateProduct({ id: clickedProductId, body: formData });

	}

	// Add Function----------------->

	const onChangeAddHandler = (e) => {
		const { name, value } = e.target;
		setProductToAdd({
			...productToAdd,
			[name]: value
		})
		setErrorVali({
			...errorVali,
			[name]: ""
		})
	}

	const onChangeAddPriceHandler = value => {
		setProductToAdd({
			...productToAdd,
			price: +value,
		});
	};

	const onChangeAddStockHandler = value => {
		setProductToAdd({
			...productToAdd,
			stock: +value,
		});
	};

	const onChangeAddThumbnailHandler = (e) => {
		setThumbnail(e.target.files[0]);
	}
	const onSubmitAddHandler = () => {
		const errors = errorAddProductValidation({ title: productToAdd.title, description: productToAdd.description, price: productToAdd.price, stock: productToAdd.stock }, thumbnail);
		if (errors.title || errors.description || errors.price || errors.stock || errors.thumbnail) {
			console.log(errors);
			setErrorVali({ title: errors.title, description: errors.description, price: errors.price, stock: errors.stock, thumbnail: errors.thumbnail });
			return;
		}
		const formData = new FormData();
		formData.append(
			"data",
			JSON.stringify({
				title: productToAdd?.title,
				description: productToAdd?.description,
				price: productToAdd?.price,
				stock: productToAdd?.stock,
			})
		)
		formData.append("files.thumbnail", thumbnail)
		addProduct( formData );
		// /api/products ----------->API Cerate
	}
	useEffect(() => {
		if (isUpdatingSuccess) {
			setClickedProductId(null);
			onCloseEditModal();
		}
		if (isSuccess) {
			setClickedProductId(null);
			onClose();
		}
		if (isAddingSuccess) {
			setProductToAdd({ title: "", description: "", price: 0, stock: 0 });
			setThumbnail(null);
			setErrorVali({ title: "", description: "", price: "", stock: "" });
			onCloseAddModal();
		}
	}, [isUpdatingSuccess, isSuccess, isAddingSuccess])

	useEffect(() => {
		if (!isOpenAddModal) {
			setProductToAdd({ title: "", description: "", price: 0, stock: 0 });
			setThumbnail(null);
			setErrorVali({ title: "", description: "", price: "", stock: "" });
		}
	}, [isOpenAddModal]);

	if (isLoading|| !isOnline) return <DashboardProductsTableSkeleton />

	return (
		<>
			<Flex direction={"column"} maxW="85%" mx={"auto"} my={6}>
				<Button colorScheme='green' onClick={() => { onOpenAddModal() }} ml={"auto"} w={"fit-content"} variant={"outline"} >
					Create Product <IoMdAdd size={20} />
				</Button>
				<TableContainer maxW="85%" mx={"auto"}>
					<Table variant='simple'>
						<TableCaption>Imperial to metric conversion factors</TableCaption>
						<Thead>
							<Tr>
								<Th>ID</Th>
								<Th>Title</Th>
								<Th>Category</Th>
								<Th>Thumbnail</Th>
								<Th isNumeric>Price</Th>
								<Th isNumeric>Stock</Th>
								<Th>Action</Th>
							</Tr>
						</Thead>
						<Tbody>
							{data?.data?.map(product => (
								<Tr key={product?.id}>
									<Td>{product?.id}</Td>
									<Td>{product?.attributes?.title}</Td>
									<Td>{product?.attributes?.category?.data?.attributes?.title}</Td>
									<Td>
										<Image
											borderRadius="full"
											objectFit="cover"
											boxSize="40px"
											src={product?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}
											alt={product?.attributes?.title}
										/>
									</Td>
									<Td isNumeric>{product?.attributes?.price}</Td>
									<Td isNumeric>{product?.attributes?.stock}</Td>
									<Td>
										<Button
											as={Link}
											to={`/products/${product.id}`}
											colorScheme="purple"
											variant="outline"
											mr={3}
											onClick={() => { }}
										>
											<AiOutlineEye size={17} />
										</Button>
										<Button colorScheme="red" variant="outline" mr={3} onClick={() => {
											setClickedProductId(product.id);
											onOpen();
										}}>
											<BsTrash size={17} />
										</Button>
										<Button colorScheme="blue" variant="outline" onClick={() => {
											setClickedProductId(product.id);
											setProductToEdit(product.attributes);
											onOpenEditModal();
										}}>
											<FiEdit2 size={17} />
										</Button>

									</Td>
								</Tr>
							))}

						</Tbody>
						<Tfoot>
							<Tr>
								<Th>ID</Th>
								<Th>Title</Th>
								<Th>Category</Th>
								<Th>Thumbnail</Th>
								<Th isNumeric>Price</Th>
								<Th isNumeric>Stock</Th>
								<Th>Action</Th>
							</Tr>
						</Tfoot>
					</Table>
				</TableContainer>
				<CustomAlertDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} title={"Are you sure?"} description={"Do you really want to destroy this product? This product cannot be undone"} cancelTxt={"Cancel"} okTxt={"Delete"}
					onOkHandler={() => destroyProduct(clickedProductId)}
					isLoading={isDestroying}
				/>
				{/* Edit Modal-------------> */}
				<CustomModal isOpen={isOpenEditModal} onClose={onCloseEditModal} title={"Update Product"} onOkClick={onSubmitEditHandler} isLoading={isUpdating}>
					<FormControl >
						<FormLabel>Title</FormLabel>
						<Input placeholder="Product Title" onChange={onChangeEditHandler} value={productToEdit?.title} name="title" />
					</FormControl>
					<FormControl my={3}>
						<FormLabel>Description</FormLabel>
						<Textarea errorBorderColor='crimson' placeholder='description' name='description' value={productToEdit?.description} onChange={onChangeEditHandler} />
					</FormControl>
					<FormControl my={3}>
						<FormLabel>Price</FormLabel>
						<NumberInput errorBorderColor='crimson' defaultValue={productToEdit?.price} precision={2} step={0.2} name='price' onChange={onChangeEditPriceHandler}>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
					<FormControl my={3}>
						<FormLabel>Stock</FormLabel>
						<NumberInput errorBorderColor='crimson' defaultValue={productToEdit?.stock} precision={2} step={0.2} name='stock' onChange={onChangeEditStockHandler}>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
					<FormControl>
						<FormLabel>Thumbnail</FormLabel>
						<Input id='thumbnail' type='file' h={"full"} p={2} accept='image/png, image/gif, image/jpeg' onChange={onChangeEditThumbnailHandler} />
					</FormControl>
				</CustomModal>
				{/* Add Modal------------> */}

				<CustomModal isOpen={isOpenAddModal} onClose={onCloseAddModal} title={"Add Product"} okTxt='Add' onOkClick={onSubmitAddHandler} isLoading={isAdding}>
					<FormControl isInvalid={errorVali.title}>
						<FormLabel>Title</FormLabel>
						<Input errorBorderColor='crimson' placeholder="Product Title" name="title" value={productToAdd.title} onChange={onChangeAddHandler} />
						{errorVali.title ?
							<FormHelperText color="red.500">
								{errorVali.title}
							</FormHelperText> : null}
					</FormControl>
					<FormControl my={3} isInvalid={errorVali.description}>
						<FormLabel>Description</FormLabel>
						<Textarea errorBorderColor='crimson' placeholder='description' name='description' value={productToAdd.description} onChange={onChangeAddHandler} />
						{errorVali.description ?
							<FormHelperText color="red.500">
								{errorVali.description}
							</FormHelperText> : null}
					</FormControl>
					<FormControl my={3} isInvalid={errorVali.price}>
						<FormLabel>Price</FormLabel>
						<NumberInput errorBorderColor='crimson' defaultValue={0} precision={2} step={0.2} name='price' value={productToAdd.price} onChange={onChangeAddPriceHandler}>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						{errorVali.price ?
							<FormHelperText color="red.500">
								{errorVali.price}
							</FormHelperText> : null}
					</FormControl>
					<FormControl isInvalid={errorVali.stock} my={3}>
						<FormLabel>Stock</FormLabel>
						<NumberInput errorBorderColor='crimson' defaultValue={0} precision={2} step={0.2} name='stock' value={productToAdd.stock} onChange={onChangeAddStockHandler}>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						{errorVali.stock ?
							<FormHelperText color="red.500">
								{errorVali.stock}
							</FormHelperText> : null}
					</FormControl>
					<FormControl isInvalid={errorVali.thumbnail}>
						<FormLabel>Thumbnail</FormLabel>
						<Input errorBorderColor='crimson' id='thumbnail' type='file' h={"full"} p={2} accept='image/png, image/gif, image/jpeg' onChange={onChangeAddThumbnailHandler} />
						{errorVali.thumbnail ?
							<FormHelperText color="red.500">
								{errorVali.thumbnail}
							</FormHelperText> : null}
					</FormControl>
				</CustomModal>
			</Flex>
		</>
	)
}

export default DashboardProductsTable
