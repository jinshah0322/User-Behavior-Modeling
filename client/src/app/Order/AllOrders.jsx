import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import Loader from "../../components/Loader/Loader";

const AllOrders = () => {
    const [orders, setOrders] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const pageSize = 5;
    const [total, setTotal] = useState(0); 
    
    const fetchData = async () => {
        try {
            const id = localStorage.getItem('id');
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/order/${id}`);
            const { orders, total } = response.data;
            setOrders(orders);
            setTotal(total); 
            setTotalPages(Math.ceil(total / pageSize));
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handlePagination = (page) => {
        setPage(page);
    }

    const columns = [
        {
            title: 'Id',
            key: 'id',
            render: (text, record, index) => (
                <span>
                    {(page - 1) * pageSize + index + 1}
                </span>
            )
        },
        {
            title: 'Order Id',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text) => <Link to={`/profile/orders/${text}`}>{text}</Link>
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (text) => <p>{new Date(text).toDateString()}</p>
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text) => <p>₹ {text}</p>
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='lg:px-36 px-4'>
           {loading ? ( 
                <div className='flex justify-center items-center min-h-[70vh]'>
                    <Loader />
                </div>
            ) : orders?.length > 0 ? (
                <>
                    <h1 className='py-4 font-semibold text-xl'>ALL ORDERS</h1>
                    <div className='py-4'>
                        <Table
                            dataSource={orders}
                            columns={columns}
                            pagination={false}
                        />
                        <div className="flex justify-center mt-4">
                            {total > 0 && (
                                <Pagination
                                    current={page}
                                    pageSize={pageSize}
                                    total={totalPages * pageSize}
                                    onChange={handlePagination}
                                    showSizeChanger={false}
                                    className="pagination"
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className='w-full flex items-center justify-center min-h-[70vh]'>
                    <h1 className='text-xl font-semibold'>No Orders Found</h1>
                </div>
            )}
        </div>
    );
}

export default AllOrders;
