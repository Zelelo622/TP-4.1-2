const cardValidator = (cardData) => {
  const { cardNumber, expirationMonth, expirationYear, cvv } = cardData;
  const errors = {};

  const cardNumberRegex = /^([0-9]{4}-){3}[0-9]{4}|[0-9]{16}$/;
  const cvvRegex = /^[0-9]{3,4}$/;

  if (!cardNumber.match(cardNumberRegex)) {
    errors.cardNumber = "Неверный номер карты";
  }

  if (!expirationMonth.match(/^(0?[1-9]|1[0-2])$/)) {
    errors.expirationMonth = "Неверный месяц";
  }

  if (!expirationYear.match(/^([2-9][2-9]|[3-9]\d)$/)) {
    errors.expirationYear = "Неверный год";
  }

  const expirationDate = new Date(`20${expirationYear}`, expirationMonth - 1);
  const currentDate = new Date();
  if (expirationDate <= currentDate) {
    errors.expirationMonth = "Срок действия карты истек";
  }

  if (!cvv.match(cvvRegex)) {
    errors.cvv = "Неверный CVV код";
  }

  return errors;
};

module.exports = cardValidator;

