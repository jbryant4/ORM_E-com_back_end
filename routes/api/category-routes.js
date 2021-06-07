const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [{
      model: Product
    }]
  })
    .then(results => res.json(results))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value

  Category.findOne({
    where: {
      id: req.params.id
    },
    // be sure to include its associated Products
    include: [{
      model: Product
    }]
  })
    .then(results => res.json(results))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(results => res.json(results))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(results=> {
      if (!results[0]) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(results => {
      if (!results) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
