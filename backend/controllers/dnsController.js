const db = require("../models");

const addDNS = async (req, res) => {
  try {
    const info = {
      domain: req.body.domainLink,
      name: req.body.name,
      recordType: req.body.recordType,
    };

    const createdDNS = await db.dns.create(info);
    res.status(200).send(createdDNS);
  } catch (err) {
    res.sendStatus(500).send("Internal server error");
  }
};

const getAllDNS = async (req, res) => {
  try {
    const dns = await db.dns.findAll({});
    res.status(200).send(dns);
  } catch (err) {
    res.sendStatus(500).send("Internal server error");
  }
};

const getOneDNS = async (req, res) => {
  try {
    const id = req.params.id;
    const dns = await db.dns.findOne({ where: { id: id } });
    res.status(200).send(dns);
  } catch (err) {
    res.sendStatus(500).send("Internal server error");
  }
};

const getDNSByType = async (req, res) => {
  try {
    const type = req.params.type;
    const dns = await db.dns.findAll({ where: { type: type } });
    res.status(200).send(dns);
  } catch (err) {
    res.sendStatus(500).send("Internal server error");
  }
};

const editDNS = async (req, res) => {
  try {
    const editedDNS = await db.dns.update(req.body, {
      where: {
        id: Number(req.body.id),
      },
    });
    res.status(200).send(editedDNS);
  } catch (err) {
    res.sendStatus(500).send("Internal server error");
  }
};

const deleteDNSById = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedDNS = await db.dns.destroy({
      where: {
        id: Number(id),
      },
    });
    res.sendStatus(200).send(deletedDNS);
  } catch (err) {
    res.sendStatus(500).send("Internal server error");
  }
};

module.exports = {
  addDNS,
  getAllDNS,
  getOneDNS,
  getDNSByType,
  deleteDNSById,
  editDNS,
};
