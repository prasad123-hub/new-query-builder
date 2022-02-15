import React from "react";
import { QueryBuilderComponent } from "@syncfusion/ej2-react-querybuilder";

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import {
  Filter,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  Sort,
  SortSettingsModel,
} from "@syncfusion/ej2-react-grids";
import { data } from "../datasource";
import { Query } from "@syncfusion/ej2-data";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { useRef } from "react";

const QueryBuilder = (props, children) => {
  const qbObj = useRef(null);
  const gridObj = useRef(null);
  const query = new Query().select([
    "OrderID",
    "CustomerID",
    "EmployeeID",
    "OrderDate",
  ]);

  function updateRule(args) {
    let predicate = this.getPredicate(args.rule);
    if (isNullOrUndefined(predicate)) {
      gridObj.current.query = new Query().select([
        "OrderID",
        "CustomerID",
        "EmployeeID",
        "OrderDate",
      ]);
    } else {
      gridObj.current.query = new Query()
        .select(["OrderID", "CustomerID", "EmployeeID", "OrderDate"])
        .where(predicate);
    }
    gridObj.current.refresh();
  }

  const tasks = [
    {
      OrderID: 1,
      CustomerID: "PRASAD",
      EmployeeID: 101,
      OrderDate: new Date(8364186e5),
    },
    {
      OrderID: 2,
      CustomerID: "JOHN",
      EmployeeID: 102,
      OrderDate: new Date(8364186e5),
    },
    {
      OrderID: 3,
      CustomerID: "JUSTIN",
      EmployeeID: 103,
      OrderDate: new Date(8364186e5),
    },
  ];
  return (
    <div class="control">
      <QueryBuilderComponent
        dataSource={tasks}
        ruleChange={updateRule}
        ref={qbObj}
      />
      <GridComponent
        dataSource={data}
        allowPaging={true}
        allowSorting={true}
        query={query}
        ref={gridObj}
      >
        <ColumnsDirective>
          <ColumnDirective field="OrderID" width="100" textAlign="Right" />
          <ColumnDirective field="CustomerID" width="100" />
          <ColumnDirective field="OrderDate" width="100" />
          <ColumnDirective field="EmployeeID" width="100" />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Group]} />
      </GridComponent>
    </div>
  );
};
export default QueryBuilder;
