import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, institute, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const existingUserEmail = await prisma.teacher.findFirst({
      where: {
        email,
      },
    });

    if (existingUserEmail) {
      return res.status(400).send("Email is already registered");
    }

    const newTeacher = await prisma.teacher.create({
      data: {
        name,
        email,
        institute,
        password: hashpassword,
      },
    });

    res.status(200).send("User registered successfully");
  } catch (e) {
    if (e.code === 'P2002') {
      res.status(400).send(`Unique constraint failed on the ${e.meta.target} field`);
    } else {
      console.error(e);
      res.status(500).send("An error occurred while registering the user");
    }
  }
};