import React from "react";
import PropTypes, { object } from "prop-types";
import { Badge, Card, QRCode } from "antd";
import moment from "moment";

const PrintTicket = ({ ticket }) => {
    return (
        <>
            <style type="text/css" media="print">
                {
                    `@page { size: portrait; }
                    @media print {
                        @page {
                          size: 110mm 135mm;
                          margin: 0;
                          height: 100%;
                        }
                      }
                    `
                }
            </style>
            <Card
                bordered={false}
                bodyStyle={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: "1em",
                    border: 'none'
                }}
            >
                <div className="text-uppercase text-center fw-bold">
                    {ticket?.service?.name}
                </div>

                <hr style={{ border: '1px dashed #749BC2'}} />

                <div className="text-center">
                    <QRCode
                        value={route("tickets.search", {
                            ticket_number: ticket.ticket_number,
                            serial_number: ticket.serial_number,
                        })}
                        bordered
                        size={200}
                        style={{
                            textAlign: "center",
                            margin: "auto",
                        }}
                    />
                </div>

                <div
                    className="text-center text-uppercase"
                    style={{
                        fontSize: 12,
                        color: "gray",
                        marginTop: "2em",
                    }}
                >
                    DATE: {moment(ticket.created_at).format("LLLL")}
                </div>

                <div
                    className="text-center"
                    style={{ fontSize: 64, fontWeight: "bold" }}
                >
                    #{ticket.ticket_number}
                </div>

                <div
                    className="text-center text-uppercase fw-bold"
                    style={{ marginBottom: 8 }}
                >
                    {ticket.category}
                </div>

                <div
                    className="text-center text-uppercase"
                    style={{
                        fontSize: 10,
                        color: "GrayText",
                    }}
                >
                    EXPIRY DATE: {moment(ticket.expiry_date).format("LLLL")}
                </div>
            </Card>
        </>
    );
};

PrintTicket.propTypes = {
    ticket: PropTypes.oneOfType([object]).isRequired,
};

export default PrintTicket;
