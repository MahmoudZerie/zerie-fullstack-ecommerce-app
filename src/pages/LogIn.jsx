import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	InputGroup,
	InputRightElement,
	FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import loginSlice, { selectlogin, userLogin } from '../app/features/loginSlice';
import { Navigate } from 'react-router-dom';
import { errorValidation } from '../validation';

export default function LoginPage({isAuthenticated}) {
	if(isAuthenticated)return <Navigate to={-1} replace/>
	
	const [showPassword, setShowPassword] = useState(false);
	const [isEmailInvalid, setIsEmailInvalid] = useState(false);
	const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
	const [errorsVali,setErrorsVali]=useState({
		email:"",
		password:""
	})
	const dispatch=useDispatch();
	const {loading,data,error}=useSelector(selectlogin)
	const [user, setUser] = useState({
		identifier: "",
		password: ""
	});
	
	// Handler
	const submitHandler = (e) => {
		e.preventDefault();
		const errors = errorValidation({ identifier: user.identifier, password: user.password });
		
		if(errors.email&&errors.password){
			setIsEmailInvalid(true);
			setIsPasswordInvalid(true);
			setErrorsVali(errors);
			return;
		}
		if(errors.email){
			setIsEmailInvalid(true);
			setErrorsVali(errors);
			return;
		}
		if(errors.password){
			setIsPasswordInvalid(true);
			setErrorsVali(errors);
			return;
		}
		setIsEmailInvalid(false);
		setIsPasswordInvalid(false);
		dispatch(userLogin(user))
		return;

	};

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
		setIsEmailInvalid(false);
		setIsPasswordInvalid(false);
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
				</Stack>
				<Box
					as={"form"}
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
					onSubmit={submitHandler}
				>
					<Stack spacing={4}>
						<FormControl id="email" isInvalid={isEmailInvalid}>
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								errorBorderColor='crimson'
								value={user.identifier}
								onChange={onChangeHandler}
								name='identifier'
							/>
							{isEmailInvalid ? 
							<FormHelperText color="red.500">
								{errorsVali.email}
							</FormHelperText> : null}

						</FormControl>
						<FormControl id="password" isInvalid={isPasswordInvalid}>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? 'text' : 'password'}
									errorBorderColor='crimson'
									value={user.password}
									onChange={onChangeHandler}
									name='password'
								/>
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() => setShowPassword((showPassword) => !showPassword)} p={0}>
										{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
									</Button>
								</InputRightElement>
							</InputGroup>
							{isPasswordInvalid ? 
							<FormHelperText color="red.500">
								{errorsVali.password}
							</FormHelperText> : null}
						</FormControl>
						<Stack spacing={10}>
							<Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								justify={'space-between'}>
								<Checkbox>Remember me</Checkbox>
								<Text color={'blue.400'}>Forgot password?</Text>
							</Stack>
							<Button
								type='submit'
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								isLoading={loading}
								>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
