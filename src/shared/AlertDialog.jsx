import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef } from "react"

export default function CustomAlertDialog({ isOpen, onOpen, onClose, title,
	descriprtion,
	cancelTxt="Cancel",
	  okTxt="Ok" ,
	  onOkHandler,
	  isLoading
	}) {
	const cancelRef = useRef()

	return (
		<>
			<AlertDialog
				motionPreset='slideInBottom'
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>{title}</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						{descriprtion}
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							{cancelTxt}
						</Button>
						<Button colorScheme='red' ml={3} onClick={onOkHandler} isLoading={isLoading}>
							{okTxt}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}