import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
const AllOrders = () => {
    const [orders, setOrders] = useState();
    const [page, setPage] = useState(1);
    const fetchData = async () => {
        try {
            const id = localStorage.getItem('id');
            const data = await axios.get(`${process.env.REACT_APP_SERVERURL}/order/${id}`);
            setOrders(data.data.orders);
            console.log(data);
        }
        catch (error) {
            console.log(error);
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
                    {index + 1 + ((page - 1) * 5)}
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
    }, [])

    return (
        <div className='lg:px-36 px-4 pt-10'>
            <h1 className='py-4 font-semibold text-xl'>ALL ORDERS</h1>
            <div className='overflow-auto'>
                <Table dataSource={orders} columns={columns}
                    pagination={{
                        defaultPageSize: 5,
                    }}
                    onChange={(page) => handlePagination(page.current)
                    }
                />
            </div>
        </div>
    );
}

export default AllOrders;