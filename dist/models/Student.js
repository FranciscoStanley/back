"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 250],
              message: 'Nome do aluno deve conter entre 3 e 250 caracteres',
            },
          },
        },
        surname: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 250],
              message: 'Sobre nome deve conter entre 3 e 250 caracteres',
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            isEmail: {
              message: 'E-mail inválido',
            },
          },
        },
        age: {
          type: _sequelize2.default.INTEGER,
          defaultValue: '',
          validate: {
            isInt: {
              message: 'Idade deve ser um número inteiro',
            },
          },
        },
        weight: {
          type: _sequelize2.default.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              message:
                'Peso precisar ser um número inteiro ou de ponto flutuante',
            },
          },
        },
        height: {
          type: _sequelize2.default.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              message:
                'Altura precisar ser um número inteiro ou de ponto flutuante',
            },
          },
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' });
  }
} exports.default = Student;
