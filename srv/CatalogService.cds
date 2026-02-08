//consume reference of my DB tables
using { anubhav.db.master, anubhav.db.transaction } from '../db/datamodel';

service CatalogService @(path: 'CatalogService') {

    //Entity  - representation of an end point of data to perform CRUDQ tasks
    entity EmployeeSet as projection on master.employee;
    entity PurchaseOrderSet as projection on transaction.purchaseorder;
    entity PurchaseItemsSet as projection on transaction.poitems;

}