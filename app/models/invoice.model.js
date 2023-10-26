module.exports = (sequelize, Sequelize) => {
  const Invoice = sequelize.define("invoice", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoice_number: {
      type: Sequelize.STRING,
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    invoice_date: {
      type: Sequelize.DATE,
    },
    due_date: {
      type: Sequelize.DATE,
    },
    amount: {
      type: Sequelize.FLOAT,
    },
  });

  Invoice.associate = (models) => {
    Invoice.belongsTo(models.project);
  };

  return Invoice;
};
