import { ReactSession } from "react-client-session";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { API } from "../global.js";

export function Profile() {
  const handleReset = () => {
    setDialogType("passwordReset");
    setOpen(true);
  };

  const handleAttendance = () => {
    setDialogType("markAttendance");
    setOpen(true);
  };

  const handleSubmitAssignment = () => {
    setDialogType("submitAssignment");
    setOpen(true);
  };

  const handleCreateAssignment = () => {
    setDialogType("createAssignment");
    setOpen(true);
  };

  const handleCreateUser = () => {
    setDialogType("createUser");
    setOpen(true);
  };

  const handleCreateSubject = () => {
    setDialogType("createSubject");
    setOpen(true);
  };

  const handleCreateNotice = () => {
    setDialogType("createNotice");
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({});
  const [dialogType, setDialogType] = useState("");

  useEffect(() => {
    fetch(`${API}/users/me`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.name = data.name.toUpperCase();
        data.role = data.role.toUpperCase();
        setUser(data);
        ReactSession.set("uid", data.uid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="profile area">
      {dialogType === "passwordReset" ? (
        <ChangePassword open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
      {dialogType === "markAttendance" ? (
        <Attendance open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
      {dialogType === "submitAssignment" ? (
        <SubmitAssignment open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
      {dialogType === "createAssignment" ? (
        <CreateAssignment open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
      {dialogType === "createNotice" ? (
        <CreateNotice open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
      {dialogType === "createUser" ? (
        <CreateUser open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
      {dialogType === "createSubject" ? (
        <CreateSubject open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
      <Card sx={{ display: "flex", minWidth: 300 }} variant="outlined">
        <div style={{ textAlign: "left", height: "100" }}>
          <CardContent>
            <Typography component="div" variant="h5">
              <b>{user.name}</b>
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <b>{user.dob}</b>
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Card sx={{ minWidth: 300 }} variant="outlined">
        <Typography component="div" variant="h5" style={{ margin: "10px" }}>
          Profile Details
        </Typography>
        <div>
          <CardContent>
            <Divider>
              <Chip label="EMAIL" />
            </Divider>
            <br />
            <Typography variant="h6" component="div" gutterBottom>
              {user.email}
            </Typography>
            <br />
            <Divider>
              <Chip label="MOBILE" />
            </Divider>
            <br />
            <Typography variant="h6" component="div" gutterBottom>
              {user.mobile}
            </Typography>
            <br />
            <Divider>
              <Chip label="PHONE NO." />
            </Divider>
            <br />
            <Typography variant="h6" component="div" gutterBottom>
              {user.phone}
            </Typography>
            <br />
            <Divider>
              <Chip label="EMAIL" />
            </Divider>
            <br />
            <Typography variant="h6" component="div" gutterBottom>
              {user.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Card sx={{ minWidth: 300 }} variant="outlined">
        <Typography component="div" variant="h5" style={{ margin: "10px" }}>
          Actions
        </Typography>
        <CardActions>
          <div className="profile-actions">
            <Button
              size="medium"
              variant="outlined"
              onClick={handleReset}
              fullWidth
              sx={{ maxWidth: 500 }}
            >
              Change Password
            </Button>
            {ReactSession.get("type") === "student" ? (
              <>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={handleAttendance}
                  fullWidth
                  sx={{ maxWidth: 500 }}
                >
                  Mark Attendance
                </Button>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={handleSubmitAssignment}
                  fullWidth
                  sx={{ maxWidth: 500 }}
                >
                  Submit Assignment
                </Button>
              </>
            ) : (
              <></>
            )}
            {ReactSession.get("type") !== "student" ? (
              <>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={handleCreateAssignment}
                  fullWidth
                  sx={{ maxWidth: 500 }}
                >
                  Create Assignment
                </Button>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={handleCreateNotice}
                  fullWidth
                  sx={{ maxWidth: 500 }}
                >
                  Create Notice
                </Button>
              </>
            ) : (
              <></>
            )}
            {ReactSession.get("type") === "admin" ? (
              <>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={handleCreateUser}
                  fullWidth
                  sx={{ maxWidth: 500 }}
                >
                  Create User
                </Button>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={handleCreateSubject}
                  fullWidth
                  sx={{ maxWidth: 500 }}
                >
                  Create Subject
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

function ChangePassword({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    fetch(`${API}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        password: newPassword,
      }),
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    }).catch((err) => {
      console.log(err);
    });

    setOpen(false);
  };

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Change your Login Password here</DialogContentText>
          <TextField
            required
            variant="filled"
            margin="dense"
            id="new_password"
            label="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            fullWidth
          />
          <TextField
            error={confirmPassword !== newPassword}
            helperText="Confirm New Password and New Password should be same"
            required
            variant="filled"
            margin="dense"
            id="confirm_password"
            label="Confirm New Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Reset</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Attendance({ open, setOpen }) {
  const [subjects, setSubjects] = useState([]);
  const [choice, setChoice] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  function updateSubjects() {
    fetch(`${API}/subjects`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data.map((subject) => subject.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateSubjects();
  }, []);

  const handleSubmit = () => {
    fetch(`${API}/attendance`, {
      method: "POST",
      body: JSON.stringify({
        subjectName: choice,
      }),
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    }).catch((err) => {
      console.log(err);
    });

    setOpen(false);
  };

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: 200 }}>
        <DialogTitle>Mark Attendance</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">
              Choose Subject
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Choose Subject"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              {subjects.map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function SubmitAssignment({ open, setOpen }) {
  const [subjects, setSubjects] = useState([]);
  const [choice, setChoice] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function updateSubjects() {
    fetch(`${API}/subjects`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateSubjects();
  }, []);

  const handleSubmit = () => {
    console.log(selectedFile);
    fetch(`${API}/assignment-submission`, {
      method: "POST",
      body: JSON.stringify({
        subject: choice,
        file: selectedFile,
      }),
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "multipart/form-data; charset=UTF-8",
      }),
    }).catch((err) => {
      console.log(err);
    });

    setOpen(false);
  };

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: 200 }}>
        <DialogTitle>Submit Assignments</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Choose Subject"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              {subjects.map((subject) => (
                <MenuItem value={subject._id}>{subject.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            required
            variant="outlined"
            color={isSelected ? "success" : "error"}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            <input type="file" name="file" onChange={changeHandler}></input>
          </Button>
          {isSelected ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:{" "}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function CreateAssignment({ open, setOpen }) {
  const [subjects, setSubjects] = useState([]);
  const [choice, setChoice] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function updateSubjects() {
    fetch(`${API}/subjects`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data.map((subject) => subject.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateSubjects();
  }, []);

  const handleSubmit = () => {
    fetch(`${API}/ass`, {
      method: "POST",
      body: JSON.stringify({
        subjectName: choice,
      }),
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    }).catch((err) => {
      console.log(err);
    });

    setOpen(false);
  };

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: 200 }}>
        <DialogTitle>Submit Assignments</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Choose Subject"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              {subjects.map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Assignment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Choose Subject"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              {subjects.map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Button
            required
            variant="outlined"
            color={isSelected ? "success" : "error"}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            <input type="file" name="file" onChange={changeHandler}></input>
          </Button>
          {isSelected ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:{" "}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function CreateUser({ open, setOpen }) {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("add");
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [password, setPassword] = useState("********");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [uid, setUid] = useState(0);
  const [phone, setPhone] = useState(0);
  const [choice, setChoice] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  async function handleAdd() {
    setOpen(!open);
    fetch(`${API}/users`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
      body: JSON.stringify({
        name: name,
        email: email,
        age: age,
        phone: phone,
        uid: uid,
        role: role,
        password: password,
      }),
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{type === "add" ? "Add User" : "Edit User"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To {type === "add" ? "Add " : "Edit "}User in the User List please
          fill the below details
          {<br />}
          It is cumpulsory to fill all fields else form doesn't get submitted
        </DialogContentText>
        <TextField
          required
          defaultValue={type === "edit" ? user.name : ""}
          variant="outlined"
          margin="dense"
          id="Name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          type="text"
          fullWidth
        />
        <TextField
          required
          defaultValue={type === "edit" ? user.email : ""}
          variant="outlined"
          margin="dense"
          id="Email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          fullWidth
        />
        <TextField
          required
          defaultValue={type === "edit" ? user.uid : ""}
          variant="outlined"
          margin="dense"
          id="uid"
          label="Uid"
          onChange={(e) => setUid(e.target.value)}
          type="text"
          fullWidth
        />
        <TextField
          error={age < 0 && age > 100}
          required
          defaultValue={type === "edit" ? user.age : ""}
          variant="outlined"
          margin="dense"
          id="Age"
          label="Age"
          onChange={(e) => setAge(e.target.value)}
          type="number"
          fullWidth
        />
        <TextField
          error={age < 0 && age > 100}
          required
          defaultValue={type === "edit" ? user.phone : ""}
          variant="outlined"
          margin="dense"
          id="phone"
          label="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          fullWidth
        />
        <TextField
          required
          defaultValue={type === "edit" ? user.role : ""}
          variant="outlined"
          margin="dense"
          id="role"
          label="Role"
          onChange={(e) => setRole(e.target.value)}
          type="text"
          fullWidth
        />
        <TextField
          error={password.length < 7}
          required
          variant="outlined"
          margin="dense"
          id="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleAdd} type="submit" disabled={password === ""}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function CreateSubject({ open, setOpen }) {
  const [subjects, setSubjects] = useState([]);
  const [type, setType] = useState("add");
  const [subject, setSubject] = useState({});
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [tid, setTid] = useState(0);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  function updateUsers() {
    fetch(`${API}/users`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.filter((user) => user.role === "teacher"));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateUsers();
  });

  async function handleAdd() {
    setOpen(!open);
    await fetch(`${API}/subjects`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        code: code,
        teacherId: tid,
      }),
      headers: {
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        {type === "add" ? "Add Subject" : "Edit Subject"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To {type === "add" ? "Add " : "Edit "}Subject in the Subject List
          please fill the below details
          {<br />}
          It is cumpulsory to fill all fields else form doesn't get submitted
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Subject Name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(event) => setName(event.target.value)}
          required
          defaultValue={type === "edit" ? subject.name : ""}
        />
        <TextField
          margin="dense"
          id="code"
          label="Subject Code"
          type="number"
          fullWidth
          variant="outlined"
          onChange={(event) => setCode(event.target.value)}
          required
          defaultValue={type === "edit" ? subject.code : ""}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={tid}
            label="Choose Teacher"
            onChange={(event) => setTid(event.target.value)}
            fullWidth
          >
            {users
              .sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })
              .map((user) => (
                <MenuItem value={user._id}>{user.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          onClick={handleAdd}
          type="submit"
          // disabled={name === "" || code === "" || tid === ""}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function CreateNotice({ open, setOpen }) {
  const [notices, setNotices] = useState([]);
  const [notice, setNotice] = useState({});
  const [type, setType] = useState("add");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  async function handleAdd() {
    if (title !== "" && description !== "") {
      setOpen(!open);

      await fetch(`${API}/notices`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
        }),
        headers: {
          Authorization: "Bearer " + ReactSession.get("token"),
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{type === "add" ? "Add Notice" : "Edit Notice"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To {type === "add" ? "Add " : "Edit "}Notice in the Notice List please
          fill the below details
          {<br />}
          It is cumpulsory to fill all fields else form doesn't get submitted
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Notice Title"
          type="text"
          fullWidth
          variant="filled"
          onChange={(event) => setTitle(event.target.value)}
          required
          defaultValue={type === "edit" ? notice.title : ""}
        />
        <TextField
          margin="dense"
          id="description"
          label="Notice Description"
          type="text"
          fullWidth
          variant="filled"
          onChange={(event) => setDescription(event.target.value)}
          required
          defaultValue={type === "edit" ? notice.description : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleAdd} type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
