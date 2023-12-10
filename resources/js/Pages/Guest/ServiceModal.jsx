import React, { useEffect, useState } from "react";
import PropTypes, { object } from "prop-types";
import { Alert, Card, Col, Modal, Row, message } from "antd";
import { isEmpty, map, toUpper } from "lodash";
import { router } from "@inertiajs/react";

const ServiceModal = ({ service, open, onCancel, ...props }) => {
    const [mouseOver, setMouseOver] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState({});

    const onOk = () => {
        setError({});
        if (isEmpty(selectedCategory)) {
            message.error("Select Category");
        }

        router.post(route("tickets.generate"), {
            service_id: service.id,
            category: selectedCategory,
        }, {
            onSuccess: console.log,
        });
    };

    useEffect(() => {
        setError(props.errors);
    }, [props]);

    // console.log("props", props);

    return (
        <Modal
            title={toUpper(`SELECT ${service.name} CATEGORY`)}
            centered
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="GENERATE TICKET"
            width={820}
            maskClosable={false}
            okButtonProps={{
                disabled: isEmpty(selectedCategory),
            }}
        >
            {!isEmpty(error) && (
                <Alert
                    message="Error"
                    showIcon
                    type="error"
                    style={{ marginBottom: 10 }}
                    description={
                        <div>
                            {map(Object.keys(error), (objKey) => (
                                <p key={objKey}>
                                    {objKey}: {error[objKey]}
                                </p>
                            ))}
                        </div>
                    }
                />
            )}
            <Row
                justify="start"
                gutter={10}
                onMouseLeave={() => setMouseOver(null)}
            >
                {map(service?.sub_services, (category, index) => {
                    if (!category) return null;

                    return (
                        <Col md={12} key={category}>
                            <Card
                                size="small"
                                hoverable
                                bordered
                                bodyStyle={{
                                    paddingTop: 2,
                                    paddingBottom: 2,
                                }}
                                onClick={() => setSelectedCategory(category)}
                                onMouseOver={() => setMouseOver(category)}
                                style={{
                                    marginBottom: 10,
                                    background:
                                        mouseOver === category ||
                                        selectedCategory === category
                                            ? "#016e57"
                                            : "#F1F0E8",
                                    fontWeight: "bold",
                                    color:
                                        selectedCategory === category
                                            ? "white"
                                            : null,
                                }}
                            >
                                <h4>
                                    {" "}
                                    {toUpper(`${index + 1}- ${category}`)}
                                </h4>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Modal>
    );
};

ServiceModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    service: PropTypes.oneOfType([object]).isRequired,
};

export default ServiceModal;
