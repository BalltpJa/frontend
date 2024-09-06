import React, { useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import moment from "moment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { gettodo, updatetodo, posttodo } from "../api";

function createTable() {
  const dataRow = [];
  gettodo.gettodoall().then((res) => {
    if (res.statusCode === 200) {
      dataRow = res.data;
    }
  });

  let mapRow = [];
  if (dataRow.length > 0) {
    mapRow = dataRow.map((item, index) => {
      return {
        id: String(Number(index) + 1),
        title: item.title ?? "",
        description: item.description ?? "",
        createdate: moment(item.updated_at).format("YYYY-MM-DD"),
        actions: item.id ?? null,
      };
    });
  }

  return mapRow;
  // return [
  //   {
  //     id: 1,
  //     title: "Edit todo s1",
  //     description: "todo description 111",
  //     createdate: moment("2024-08-23T15:05:23.682Z").format("YYYY-MM-DD"),
  //     actions: "555",
  //   },
  // ];
}

export default function FromTodoView() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [titles, settitle] = useState();
  const [descriptions, setdescription] = useState();
  const [titelDialog, setTitelDialog] = useState();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [textAlert, settextAlert] = React.useState();
  const [iconAlert, seticonAlert] = React.useState();
  const [descriptionError, setDescriptionError] = useState(false);
  const [titelError, setTitelError] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAlertDelete, setOpenAlertDelete] = React.useState(false);
  const [textAlertDelete, settextAlertDelete] = React.useState();
  const [iconAlertDelete, seticonAlertDelete] = React.useState();

  const columns = [
    { field: "id", headerName: "No", width: 70 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "createdate", headerName: "Create Date", width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      getActions: (row) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(row.row)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteOutlinedIcon />}
          label="Delete"
          className="textPrimary"
          onClick={handleDeleteDialog(row.row)}
          color="inherit"
        />,
      ],
    },
  ];

  const handleDeleteDialog = (row) => () => {
    setItems(row);
    setOpenDelete(true);
  };

  const handleDelete = () => {
    console.log(items);
    updatetodo.deletetodobyid(items.actions).then((res) => {
      if (res.statusCode === 200) {
        settextAlertDelete("Delete Success");
        seticonAlertDelete("success");
        setOpenAlertDelete(true);
        setTimeout(() => {
          setdescription("");
          settitle("");
          handleClose();
        }, 1500);
      } else {
        settextAlertDelete("Delete Error");
        seticonAlertDelete("error");
        setOpenAlertDelete(true);
        setTimeout(() => {
          setOpenAlertDelete(false);
        }, 1500);
      }
    });
  };

  const paginationModel = { page: 0, pageSize: 5 };
  let rows = createTable();

  const handleCreateFrom = () => {
    setTitelDialog("Create");
    setItems([]);
    setOpen(true);
  };

  const handleEditClick = (itemArray) => () => {
    setTitelDialog("Edit");
    setItems(itemArray);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };
  const handleTextChangeTitles = (event) => {
    settitle(event.target.value);
    if (titles.length >= 0) {
      setTitelError(false);
    }
  };
  const handleTextChangeDescription = (event) => {
    setdescription(event.target.value);
    if (descriptions >= 0) {
      setDescriptionError(false);
    }
  };

  const handleSendAPI = () => {
    if (titelDialog === "Edit") {
      let dataTitles = titles ?? items.description;
      let dataDescriptions = descriptions ?? items.title;
      const bodys = {
        title: dataTitles,
        description: dataDescriptions,
      };
      updatetodo.updatatodobyid(bodys, items.actions).then((res) => {
        if (res.statusCode === 200) {
          settextAlert("Update Success");
          seticonAlert("success");
          setOpenAlert(true);
          setTimeout(() => {
            setdescription("");
            settitle("");
            handleClose();
          }, 1500);
        } else {
          settextAlert("Update Error");
          seticonAlert("error");
          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
          }, 1500);
        }
      });
    } else if (titelDialog === "Create") {
      if (titles === "") {
        setTitelError(true);
        return;
      }
      if (descriptions === "") {
        setDescriptionError(true);
      }
      const body = {
        title: titles,
        description: descriptions,
      };
      posttodo.createtodo(body).then((res) => {
        if (res.statusCode === 200) {
          settextAlert("Create Success");
          seticonAlert("success");
          setOpenAlert(true);
          setTimeout(() => {
            setdescription("");
            settitle("");
            handleClose();
          }, 1500);
        } else {
          settextAlert("Create Error");
          seticonAlert("error");
          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
          }, 1500);
        }
      });
    }
  };
  return (
    <div className="section p-5 pagination col-12">
      <Button variant="outlined" onClick={handleCreateFrom}>
        Create
      </Button>
      <Paper sx={{ height: 400, width: "65%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <br />
        <Collapse in={openAlert}>
          <Alert severity={iconAlert}>{textAlert}</Alert>
        </Collapse>
        <DialogTitle>{titelDialog} </DialogTitle>
        <DialogContent>
          <br />
          <div>
            <TextField
              required
              label="Title"
              id="title"
              size="small"
              defaultValue={items.title}
              onChange={handleTextChangeTitles}
              error={titelError}
            />
          </div>{" "}
          <br />
          <div>
            <TextField
              required
              label="Description"
              id="description"
              size="small"
              defaultValue={items.description}
              onChange={handleTextChangeDescription}
              error={descriptionError}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSendAPI}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <br />
        <Collapse in={openAlertDelete}>
          <Alert severity={iconAlertDelete}>{textAlertDelete}</Alert>
        </Collapse>
        <DialogTitle>Confirm Delete </DialogTitle>
        <DialogContent>Delete Item : {items.id} ?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
