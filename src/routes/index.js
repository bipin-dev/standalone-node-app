const routers = [
  {
    route: "/",
    handler: "WorkflowService",
    method: "home",
    request_type: "get",
  },
  {
    route: "/create",
    handler: "WorkflowService",
    method: "create",
    request_type: "post",
  },
  {
    route: "/update/:id",
    handler: "WorkflowService",
    method: "update",
    request_type: "post",
  },
  {
    route: "/remove/:id",
    handler: "WorkflowService",
    method: "remove",
    request_type: "delete",
  },
  {
    route: "/get",
    handler: "WorkflowService",
    method: "find",
    request_type: "get",
  },
  {
    route: "/get/:id",
    handler: "WorkflowService",
    method: "find",
    request_type: "get",
  },
];

module.exports = routers;
