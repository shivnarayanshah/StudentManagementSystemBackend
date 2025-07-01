import Student from "../models/studentModel.js";

export const addStudent = async (req, res) => {
  const { name, email, course, age } = req.body;

  try {
    const student = Student.findOne({ email });
    if (student)
      return res
        .status(400)
        .json({
          message:
            "Student with this gmail is already added please use another gmail",
        });
    await Student.create({
      name,
      email,
      course,
      age,
    });
    return res.status(200).json({ message: "Student Added Successfully" });
  } catch (error) {
    return res.status(400).json(`${error}`);
  }
};
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    return res.status(200).json(students);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};
export const getPaginatedStudents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = req.query.limit;
  const search = req.query.search || "";

  const query = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { course: { $regex: search, $options: "i" } },
    ],
  };

  const skip = (page - 1) * limit;

  try {
    const students = await Student.find(search ? query : {})
      .skip(skip)
      .limit(limit);
    const totalStudents = await Student.countDocuments(search ? query : {});
    return res.status(200).json({
      students,
      currentPage: page,
      totalStudents,
      totalPages: Math.ceil(totalStudents / limit),
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
export const getSingleStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) return res.status(200).json(null);
    return res.status(200).json(student);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const deleteSingleStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student)
      return res.status(400).json({ message: "Student doesnt exist" });
    const result = await Student.findByIdAndDelete(id);
    return res.status(200).json({ message: "Student deleted Successfully." });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, age, course } = req.body ?? {};
  console.log(name);

  try {
    const student = await Student.findById(id);

    if (!student)
      return res.status(400).json({ message: "Student doesn't Exist." });
    student.name = name || student.name;
    student.email = email || student.email;
    student.age = age || student.age;
    student.course = course || student.course;
    await student.save();
    return res.status(200).json({ message: "Student Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const getStudentByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(200).json(null);
    }

    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error}` });
  }
};
