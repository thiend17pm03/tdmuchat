const {tag} = require("./../services/index");

const createTag = async (req,res) =>{
  try {
    
    let tagName =  req.body.name;
    let newTag = await tag.addNew(tagName);
    //let allTag = await tag.getAll();
    //console.log(newTag);
    return res.status(200).send({success: !!newTag});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

const getTag = async (req,res) =>{
  res.status(200).json({success : true})
}

module.exports = {
  createNewTag : createTag,
  getTag : getTag,
}

