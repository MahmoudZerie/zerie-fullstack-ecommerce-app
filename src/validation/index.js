export const errorValidation = (login) => {
	const errors = {
		email: "",
		password: "",
	};

	const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!login.identifier) {
		errors.email = "Email is required";
	} else if (!validEmailPattern.test(login.identifier)) {
		errors.email = "Invalid email format";
	}

	if (!login.password) {
		errors.password = "Password is required";
	} else if (login.password.length < 6) {
		errors.password = "Password must be at least 6 characters long";
	}
	console.log(login)
	return errors;
}


export const errorAddProductValidation = (product, thumbnail) => {
    const errors = {
        title: "",
        description: "",
        price: "",
        stock: "",
        thumbnail: ""
    };

    // Title Validation
    if (!product.title) {
        errors.title = "Title is required";
    } 

    // Description Validation
    if (!product.description) {
        errors.description = "Description is required";
    } 

    // Price Validation
    if (product.price === undefined || product.price === null) {
        errors.price = "Price is required";
    } else if (isNaN(product.price) || product.price < 0) {
        errors.price = "Invalid price";
    }

    // Stock Validation
    if (product.stock === undefined || product.stock === null) {
        errors.stock = "Stock is required";
    } else if (isNaN(product.stock) || product.stock < 0) {
        errors.stock = "Invalid stock";
    }

    // Thumbnail Validation
    if (!thumbnail) {
        errors.thumbnail = "Thumbnail is required";
    } else {
        const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validFileTypes.includes(thumbnail.type)) {
            errors.thumbnail = "Invalid thumbnail format. Only JPEG, PNG, and GIF are accepted.";
        }
    }

    return errors;
}