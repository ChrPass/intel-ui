import { Layout, Table, Tag, Space } from 'antd';
import apiCall from '../../utils/apiWrapper';
import React, { useEffect, useState, useMemo } from 'react';
import './Home.css'
import SearchField from "../../components/SearchField"
import useItems from 'antd/lib/menu/hooks/useItems';
const { Header, Content, Footer } = Layout;
const columns = [
    {
        title: 'Label',
        dataIndex: 'label',
        key: 'label',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Obo Id',
        dataIndex: 'obo_id',
        key: 'obo_id',
    },
    {
        title: 'Ontology Name',
        dataIndex: 'ontology_name',
        key: 'ontology_name',
    },
    {
        title: 'Tags',
        dataIndex: 'synonyms',
        render: (synonyms) => (
            <span>
                {synonyms.map((synonym, index) => {
                    return (
                        <Tag color={'geekblue'} key={`${synonym.name}-${index}`}>
                            {synonym.name.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
];

const Home = () => {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        const handleCall = async () => {
            try {
                const res = await apiCall({
                    method: 'get',
                    url: '/terms/api'
                })

                setList(res)
            } catch (e) {
                alert("Something went wrong")
            }

        }

        handleCall()
    }, [])

    const isIncluded = (searchWord = "", searchItem = "") => {
        const item = searchItem.toString()
        return item.trim().toLowerCase().includes(searchWord);
    }

    const filteredData = useMemo(() => {
        const lowSearch = search.trim().toLowerCase();

        if (lowSearch) {
            const newList = [...list].filter(item => {
                return (
                  isIncluded(lowSearch, item.description) ||
                  isIncluded(lowSearch, item.label) ||
                  isIncluded(lowSearch, item.obo_id) ||
                  isIncluded(lowSearch, item.obo_id) ||
                  isIncluded(lowSearch, item.ontology_prefix) ||
                  isIncluded(lowSearch, item.short_form) ||
                  !!item?.synonyms.find(x => isIncluded(lowSearch, x.name))
                );
            })
            return newList
        } else {
            return list;
        }
    }, [search, list]);


    const handleSearch = (e) => {
        const newValue = e.target.value;
        setSearch(newValue);
    }



    return <>
        <div id='generic-table'>
                <Space direction="horizontal" align="center">
                    <SearchField value={search} onChange={handleSearch} />
                </Space>
            <Table
                className="table-content"
                rowKey="obo_id"
                pagination={{
                    pageSize: 10,
                }}
                style={{height: "10px!important"}}
                scroll={{
                    y: window.innerHeight - 300,
                    x: 400
                }}
                expandable={{
                    expandedRowRender: (record) => (
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            {record.description}
                        </p>
                    ),
                    rowExpandable: (record) => record.description,
                }} columns={columns} dataSource={filteredData} />
        </div>
    </>
};

export default Home;