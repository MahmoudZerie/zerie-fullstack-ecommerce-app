import { useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

const InternetConnectionProvider = ({ children }) => {
	const dispatch=useDispatch();
	const toast = useToast();
	const toastIdRef = useRef();

	function close() {
		toast.closeAll(toastIdRef.current);
	}

	function addToast() {
		toastIdRef.current = toast({
			title: "You'r offline",
			description: "Please make sure you have internet connection",
			status: "warning",
			duration: null,
			isClosable: true,
			icon: <BsWifiOff size={20} />
		})
	}
	const setOffline=()=> {
		dispatch(networkMode(false));
		addToast()
	}
	const setOnline=()=> {
		dispatch(networkMode(true));
		close()
	}

	useEffect(() => {
		window.addEventListener("offline", setOffline)
		window.addEventListener("online", setOnline);

		return ()=>{
			window.removeEventListener("offline", setOffline),
			window.removeEventListener("online", setOnline)
		}

	}, []);


	return children;
};
export default InternetConnectionProvider;