'use strict';

/**
 * Created by gong on 14-4-1.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var InvoiceItemSchema = new Schema({
    //source.sid.row
    source: String,
    iId: {type: String, ref: 'Inventory'},
    qty: Number,
    price: {
        nontax: Number,
        dutiable: Number,
        taxRate: Number
    },
    status: {type: String, ref: 'Status'}
});
var InvoiceSchema = new Schema({
    _id: String,
    date: Date,
    operator: {type: String, ref: 'Employee'},
    cId: {type: String, ref: 'Employee'},
    items: [InvoiceItemSchema],
    iAmount: Number,
    accomplished: Number,
    direction: Boolean,
    status: {type: String, ref: 'Status'},
    created: {
        date: {type: Date, default: Date.now},
        eId: {type: String, ref: 'Employee'}
    },
    updated: [
        {
            date: {type: Date, default: Date.now},
            eId: {type: String, ref: 'Employee'}
        }
    ]
});
InvoiceSchema.statics = {};
InvoiceSchema.methods = {};
mongoose.model('Invoice', InvoiceSchema);