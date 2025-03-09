import Invoice from "../models/invoice.js";
import Client from "../models/client.js";
import transport from "../middlewares/mailing.js";
import moment from "moment";
import cron from "node-cron";
import dotenv from "dotenv";
import got from "got";
import randomstring from "randomstring";

dotenv.config()


// Create an invoice
export async function createInvoice(req, res) {
    try {
        let invoice = await Invoice.create(req.body);
        if (invoice) {
            res.status(200).json({
                success: true,
                message: 'Invoice created successfully',
                data: invoice
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Invoice cannot be created at this time'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Invoice could not be created. check console for error log'
        })
    }
}

// Send an invoice and Payment Reminder
export async function sendInvoice(req, res) {
    try {
        let invoice = await Invoice.findOne({ InvoiceId: req.params.id });
        console.log(invoice);
        if (invoice) {
            res.status(200).json({
                success: true,
                message: "Invoice Found",
                data: invoice
            })

            
            //Send Invoice to Client
            let mailData = {
                from: '"Ansh" <anshagrawal0609@gmail.com>', // sender address
                to: invoice.Email, // recepient
                subject: 'Your Invoice!',
                template: 'invoice', 
                context: {
                    name: invoice.Email, 
                    address: invoice.Address,
                    invoiceId: invoice.InvoiceId,
                    date: moment(),
                    due_date: invoice.DueDate,
                    task: invoice.Task,
                    amount: invoice.Amount
                    
                }
            };

            transport.sendMail(mailData, function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });


            // Send reminder after due date passes and invoice is unpaid
            // let dueDateMoment = moment(invoice.DueDate);
            // let dueDateMomentArray = [dueDateMoment.format("m"), dueDateMoment.format("H"), dueDateMoment.format("D"), dueDateMoment.format("M")];

            // cron.schedule(dueDateMomentArray[0] + ' ' + dueDateMomentArray[1] + ' ' + dueDateMomentArray[2] + ' ' + dueDateMomentArray[3] + ' *', async function () {
            //     await invoice.reload();

            //     if (invoice.Paid == false) {
            //         let reminderMailData = {
            //             from: '"Catherine" <catherinemuthoni865@gmail.com>', 
            //             to: invoice.Email, 
            //             subject: '*IMPORTANT* Payment Overdue: Kindly make your payment',
            //             text: 'Kindly make your payment for the following invoice',
            //             template: 'email', 
            //             context: {
            //                 name: invoice.Email, 
            //                 city: invoice.Location, 
            //                 address: invoice.Address,
            //                 invoiceId: invoice.InvoiceId,
            //                 date: moment(),
            //                 due_date: invoice.DueDate,
            //                 task: invoice.Task,
            //                 amount: invoice.Amount,
            //                 price: invoice.Amount
            //             }
            //         };

            //         transport.sendMail(reminderMailData, function (error, info) {
            //             if (error) {
            //                 return console.log(error);
            //             }
            //             console.log('Reminder sent: ' + info.response);
            //         });


            //     } else {
            //         console.log("Payment was made on time. No reminders needed");

            //     }


            // });


        } else {
            res.json({
                success: true,
                message: 'No User records found.',
            })

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })

    }
}




