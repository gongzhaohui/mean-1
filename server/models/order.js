'use strict';

/**
 * Created by gong on 14-3-31.
 * todo
 * 更新履历函数
 * 更新价格历史
 * 订单类型
 *
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var OrderItemSchema = new Schema({
    row: {type: Number, index: true, unique: true},
    iId: {type: String, ref: 'Inventory', index: true},
    qty: {
        ordered: {type:Number,min:1},
        delivered: {type: Number, default: 0}
    },
    category: {type: String, ref: 'Category', index: true},
    way: {type: String, ref: 'Way', index: true},
    price: {
        nontax: Number,
        dutiable: Number,
        taxRate: Number
    },
    deuDate: Date,
    status:{type:String,ref:'Status'}
}, {autoId: false});
var OrderSchema = new Schema({
    _id: String,
    eId: {type: String, ref: 'Employee', index: true},
    cId: {type: String, ref: 'Customer', index: true},
    //Order,po
    orderType:String,
    //Order:test,regular,claim;//po;regular,outsourcing
    voucherType:String,
    deuDate: {type: Date, index: true},
    //taxed
    amount:Number,
    items: [OrderItemSchema],
    status: {type: String, ref: 'Status', index: true},
    created: {
        date: {type: Date, default: Date.now, index: true},
        eId: {type: String, ref: 'Employee', index: true}
    },
    updated: [
        {
            date: {type: Date, default: Date.now},
            eId: {type: String, ref: 'Employee'}
        }
    ]
});
OrderSchema.index({_id: 1, 'items.row': 1});
OrderSchema.index({orderType: 1, voucherType:1});
/*
populate employee,inventory,customer*/
OrderSchema.statics = {
    load : function(id, cb) {
        this.findOne({
            _id: id
        })
            .populate('eId', 'name username')
            .populate('items.iId','toolNo drawingNo')
            .populate('cId','name _id')
            .exec(cb);
    }
};
OrderSchema.methods = {};
mongoose.model('Order', OrderSchema);