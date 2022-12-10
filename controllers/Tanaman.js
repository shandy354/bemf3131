import Tanaman from "../model/tanamanModel.js";
import User from "../model/userModel.js";
import { convertToSlug } from "../libs/functions.js";

export const getAll = async (req, res) => {
  try {
    const data = await Tanaman.findAll();
    if (data.length > 0) {
      res.status(200).json({
        status: "200",
        data: data,
      });
    } else {
      res.status(200).json({
        message: "tidak ada data",
        data: [],
      });
    }
  } catch (error) {
    res.status(402).json({
      message: error,
    });
  }
};

export const getTanaman = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Tanaman.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
    } else {
      response = await Tanaman.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDetil = async (req, res) => {
  const url = req.params.url;
  Tanaman.findOne({
    where: { url: url },
    attributes: ["nama", "kategori", "lokasi", "deskripsi", "img"],
  })
    .then((result) => {
      if (result) {
        res.send({
          code: 200,
          message: "ok",
          data: result,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "tidak ada data",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
};
export const getDetilById = async (req, res) => {
  const id = req.params.id;
  Tanaman.findOne({
    where: { id: id },
    attributes: ["nama", "kategori", "lokasi", "deskripsi", "img"],
  })
    .then((result) => {
      if (result) {
        res.send({
          code: 200,
          message: "ok",
          data: result,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "tidak ada data",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: error.message });
    });
};

export const createTanaman = async (req, res) => {
  try {
    await Tanaman.create({
      nama: req.body.nama,
      kategori: req.body.kategori,
      lokasi: req.body.lokasi,
      deskripsi: req.body.deskripsi,
      img: req.file.filename,
      url: convertToSlug(req.body.nama + " " + Math.random(1000)),
      userId: req.userId,
    });
    res.status(201).json({ msg: "Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateTanaman = async (req, res) => {
  try {
    const tanaman = await Tanaman.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!tanaman) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await Tanaman.update(
        {
          nama: req.body.nama,
          kategori: req.body.kategori,
          lokasi: req.body.lokasi,
          deskripsi: req.body.deskripsi,
          img: req.file.filename,
          url: convertToSlug(req.body.nama + " " + Math.random(1000)),
        },
        {
          where: {
            id: tanaman.id,
          },
        }
      );
    } else {
      if (req.userId !== tanaman.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Tanaman.update(
        {
          nama: req.body.nama,
          kategori: req.body.kategori,
          lokasi: req.body.lokasi,
          deskripsi: req.body.deskripsi,
          img: req.file.filename,
          url: convertToSlug(req.body.nama + " " + Math.random(1000)),
        },
        {
          where: {
            [Op.and]: [{ id: tanaman.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Product updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const up = async (req, res) => {
  const id = req.params.id;
  const data = {
    nama: req.body.nama,
    kategori: req.body.kategori,
    lokasi: req.body.lokasi,
    deskripsi: req.body.deskripsi,
    url: convertToSlug(req.body.nama + " " + Math.random(1000)),
  };
  if (req.file != undefined) {
    data["img"] = req.file.filename;
  }
  await Tanaman.update(data, {
    where: { id: id },
  })
    .then((result) => {
      res.status(200).json({
        message: "berhasil update data",
        data: data,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

export const deleteTanaman = async (req, res) => {
  try {
    const tanaman = await Tanaman.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!tanaman) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin") {
      await Tanaman.destroy({
        where: {
          id: tanaman.id,
        },
      });
    } else {
      if (req.userId !== tanaman.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Tanaman.destroy({
        where: {
          [Op.and]: [{ id: tanaman.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "tanaman deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
