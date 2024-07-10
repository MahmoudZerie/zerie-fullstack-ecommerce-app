import { Card, CardBody, Heading, Image, Stack, Text, Button, useColorMode } from "@chakra-ui/react";
import React from 'react';
import { Link } from "react-router-dom";

const ProductCard = ({ attributes,id }) => {
	const { colorMode } = useColorMode();
	// console.log(attributes)
	return (
		<Card border={"1px solid #a8b5c8"}>
			<CardBody>
				<Image
					src={attributes?.thumbnail?.data?.attributes?.formats?.small?.url}
					alt='Green double couch with wooden legs'
					borderRadius='50%'
					width="200px"
					height="200px"
					mx={"auto"}
					objectFit={"cover"}
				/>
				<Stack mt='6' spacing='3'>
					<Heading size='md' textAlign={"center "}>{attributes.title}</Heading>
					<Text textAlign={"center"}>
						This sofa is perfect for modern tropical spaces, baroque inspired
						spaces, earthy toned spaces and for people who love a chic design with a
						sprinkle of vintage design.
					</Text>
					<Text color='blue.600' fontSize='2xl' textAlign={"center"}>
						{`$${attributes.price}`}
					</Text>
					<Button
						as={Link}
						to={`/products/${id}`}
						bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
						color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
						size={"xl"}
						variant="outline"
						border={"none"}
						py={5}
						overflow={"hidden"}
						w={"full"}
						_hover={{
							bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
							color: colorMode === "light" ? "white" : "#9f7aea",
							border: "transparent",
						}}
						mt={6}
					>
						View Details
					</Button>
				</Stack>
			</CardBody>
		</Card>
	);
};

export default ProductCard;
