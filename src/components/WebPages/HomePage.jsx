import React, { useEffect, useState } from 'react'
import { focusOnFeild, hasValidationError, validationError } from '../helpers/frontend';
import { validate } from '../helpers/formInputValidate';
import { toast } from 'react-toastify';

function HomePage() {
    const [errors, setErrors] = useState([]);
    const [confirm, setconfirm] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [productData, setproductData] = useState([])
    const [editmodal, setEditmodal] = useState(false)
    const [showModal, setShowmodal] = useState(false)
    const [formData, setformdata] = useState({
        productName: "",
        quantity: "",
        productId: 1,
        productprice: "",
    })
    const onChange = (e) => {
        const { name, value } = e.target
        setformdata((pre) => ({
            ...pre,
            [name]: value
        }))
    }
    function calculateTotal(productNumber, quantity) {
        return Number(productNumber) * Number(quantity);
    }
    const onSubmitHandle = (e) => {
        e.preventDefault()
        if (!validate(formData, setErrors)) {
            return;
        }
        const alreadySaved = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
        const productId = alreadySaved.length + 1
        alreadySaved.push({ ...formData, productId: productId })
        localStorage.setItem("products", JSON.stringify(alreadySaved))
        setproductData(alreadySaved)
        toast.success("Product added success")
        setShowmodal(false)
    }
    useEffect(() => {
        const alreadySaved = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
        setproductData(alreadySaved)
    }, [])

    const productDelete = (id) => {
        console.log(id, "<<<<", deleteId);
        const updatedProducts = localStorage.getItem("products")
            ? JSON.parse(localStorage.getItem("products")).filter((product) => product.productId !== id)
            : [];

        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setproductData(updatedProducts); // Optionally update your state with the new product data
        toast.success("Product deleted success")
        setDeleteId()
        console.log(`Product with ID ${id} deleted.`);
    };


    const productEdit = (id) => {
        setEditmodal(true)
        setShowmodal(true)
        const productDetails = productData?.find((item) => item?.productId == id)
        console.log(productDetails, "<<<<");
        if (productDetails) {
            formData.productName = productDetails?.productName
            formData.productprice = productDetails?.productprice
            formData.quantity = productDetails?.quantity
            formData.productId = productDetails?.productId
            setTimeout(() => {
                setformdata({ ...formData })
            }, 50);
        } else {
            toast.error("Product is not found !")
        }

    };

    const total = productData?.reduce((accumulator, item) => {
        // Assuming item has a property like 'productPrice'
        return accumulator + Number(item.productprice) * Number(item?.quantity);
    }, 0); // 0 is the initial value of the accumulator

    console.log(total);

    const productEditSave = () => {
        const updatedProducts = productData.map((product) => {
            console.log(product.productId, formData.productId, "<<<");
            if (product.productId == formData.productId) {
                return { ...product, ...formData };
            }
            return product;
        });

        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setproductData(updatedProducts);
        setEditmodal(false)
        setShowmodal(false)
        setformdata({})
        // Optionally update your state with the new product data
        toast.success("Product edited successfully");
    };

    return (
        <div className='main-container p-4'>
            {
                deleteId &&
                <div id="toast-container" className="toast-top-center">
                    <div className="toastr toast-info" style={{width:"460px"}} aria-live="polite" >
                        <div className="toast-message">
                            <span className="toastr-icon"><em className="icon ni ni-info-fill"></em>
                            </span>
                            <div className="toastr-text">
                                Are you sure you want to delete?
                                <button type="button"
                                    // onClick={productDelete(deleteId)} 
                                    class="swal2-confirm swal2-styled" onClick={() => { productDelete(deleteId) }} style={{ minWidth: "10px", padding: "4px 8px" }} >Yes</button>
                                <button type="button" class="swal2-cancel swal2-styled" onClick={() => { setDeleteId() }} style={{ minWidth: "10px", padding: "4px 8px" }} >No</button>
                            </div>
                        </div>
                    </div>
                </div>}

            <div className="nk-content-body border p-4 rounded">
                <div className="nk-block-head nk-block-head-sm">
                    <div className="nk-block-between">
                        <div className="nk-block-head-content">
                            <h3 className="nk-block-title page-title">All Products</h3>
                            <div className="nk-block-des text-soft">
                                <p>Total Products : {productData?.length} </p>
                            </div>
                        </div>
                        <div className="nk-block-head-content">
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r"></em></a>
                                <div className="toggle-expand-content" data-content="pageMenu">
                                    <ul className="nk-block-tools g-3">
                                        <li className="nk-block-tools-opt d-none d-sm-block">
                                            <a className="btn btn-primary" onClick={() => {
                                                setformdata({})
                                                setEditmodal(false)
                                                setShowmodal(true)
                                            }}><em className="icon ni ni-plus"></em><span>Add Product</span></a>
                                        </li>

                                    </ul>
                                </div>
                            </div></div>
                    </div>
                </div>
                <div className="nk-block">
                    <div className="card card-bordered card-stretch">
                        <div className="card-inner-group">
                            <div className="card-inner p-0">
                                <table className="nk-tb-list nk-tb-ulist">
                                    <thead>
                                        <tr className="nk-tb-item nk-tb-head">
                                            <th className="nk-tb-col nk-tb-col-check">
                                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                                    Sr.
                                                </div>
                                            </th>
                                            <th className="nk-tb-col"><span className="sub-text">Products Name</span></th>
                                            <th className="nk-tb-col"><span className="sub-text">Price</span></th>
                                            <th className="nk-tb-col"><span className="sub-text">Quantity</span></th>
                                            <th className="nk-tb-col tb-col-lg"><span className="sub-text">Total</span></th>
                                            <th className="nk-tb-col tb-col-mb"><span className="sub-text">Action</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {productData?.length == 0 && <p className='emty-heading'>Your cart is empty.</p>}

                                        {
                                            productData?.map((item, index) => {
                                                return (
                                                    <tr key={index} className="nk-tb-item">
                                                        <td className="nk-tb-col nk-tb-col-check">
                                                            <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                {index + 1}
                                                            </div>
                                                        </td>
                                                        <td className="nk-tb-col">
                                                            <a href="#" className="project-title">
                                                                <div className="project-info">
                                                                    <h6 className="title">{item?.productName}</h6>
                                                                </div>
                                                            </a>
                                                        </td>
                                                        <td className="nk-tb-col ">
                                                            <span>
                                                                <i className="fa fa-rupee prefix"></i>
                                                                {item?.productprice}</span>
                                                        </td>
                                                        <td className="nk-tb-col ">
                                                            <span>{item?.quantity}</span>
                                                        </td>
                                                        <td className="nk-tb-col ">
                                                            <span>
                                                                <i className="fa fa-rupee prefix"></i>
                                                                {calculateTotal(item?.productprice, item?.quantity)}
                                                            </span>
                                                        </td>
                                                        <td className="nk-tb-col tb-col-mb">
                                                            <span onClick={() => {
                                                                productEdit(item?.productId)
                                                            }} className="badge cursor-pointer badge-dim bg-warning">
                                                                <em class="icon ni ni-edit"></em>
                                                            </span>
                                                            <span onClick={() => {
                                                                setDeleteId(item?.productId)
                                                            }} className="badge cursor-pointer badge-dim bg-warning">
                                                                <em class="icon ni ni-trash-fill"></em>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            productData?.length > 0 &&
                                            <tr className="nk-tb-item">
                                                <td className="nk-tb-col ">  <span></ span> </td>
                                                <td className="nk-tb-col ">  <span></ span> </td>
                                                <td className="nk-tb-col ">  <span></ span> </td>
                                                <td className="nk-tb-col ">  <span> Total :  </ span> </td>
                                                <td className="nk-tb-col ">
                                                    <span>
                                                        <i className="fa fa-rupee prefix"></i>

                                                        {total}  </span>
                                                </td>
                                                <td className="nk-tb-col ">  <span></ span> </td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className="card-inner">
                                {/* <Pagination /> */}
                            </div>
                        </div>
                    </div>
                </div>
                {showModal &&
                    <div className="modal fade show" id="modalForm" style={{ display: "block" }} aria-modal="true" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Product</h5>
                                    <a href="#" onClick={() => setShowmodal(false)} className="close" data-bs-dismiss="modal" aria-label="Close">
                                        <em className="icon ni ni-cross"></em>
                                    </a>
                                </div>
                                <div className="modal-body">
                                    <form action="#" onSubmit={onSubmitHandle} className="form-validate is-alter" validate="validate">
                                        <div className="form-group">
                                            <label className="form-label" >Product Name</label>
                                            <div className="form-control-wrap">
                                                <input type="text" name='productName' value={formData?.productName} onChange={onChange} placeholder='Product Name' className="form-control" required="" />
                                                {hasValidationError(errors, "productName") ? (<span style={{ color: "red" }} className="has-cust-error">{formData?.productName == "" && validationError(errors, "productName")}</span>) : null}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" > Product Price</label>
                                            <div className="form-control-wrap">
                                                <input type="number" name='productprice' value={formData?.productprice} onChange={onChange} placeholder='Product Price' className="form-control" />
                                                {hasValidationError(errors, "productprice") ? (<span style={{ color: "red" }} className="has-cust-error">{formData?.productprice == "" && validationError(errors, "productprice")}</span>) : null}

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" > Quantity</label>
                                            <div className="form-control-wrap">
                                                <input type="number" name='quantity' value={formData?.quantity} onChange={onChange} placeholder='Product quantity' className="form-control" />
                                                {hasValidationError(errors, "quantity") ? (<span style={{ color: "red" }} className="has-cust-error">{formData?.quantity == "" && validationError(errors, "quantity")}</span>) : null}

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            {
                                                editmodal ?
                                                    <button type='button' onClick={() => { productEditSave() }} className="btn btn-lg btn-primary">Update </button> :
                                                    <button type="submit" className="btn btn-lg btn-primary">Save </button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>

    )
}

export default HomePage