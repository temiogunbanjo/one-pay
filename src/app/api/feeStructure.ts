/* eslint-disable @typescript-eslint/no-explicit-any */
type FeeStructure = { [x: string]: Record<string, any> };

const mediaFeeStructure: FeeStructure = {
  lvl100: {
    minimumPercentage: 0.8,
    fees: {
      schoolFee: 2550,
      srcFee: 50,
      medicalInsurance: 20,
      departmentFee: 70,
    },
    get amount() {
      // Calculate the total amount by summing up all fees
      return Object.keys(this.fees).reduce((total, key) => {
        return total + this.fees[key];
      }, 0);
    },
    get minimumAmount() {
      return this.amount * this.minimumPercentage;
    },
  },
  lvl200: {
    minimumPercentage: 0.7,
    fees: {
      schoolFee: 2550,
      srcFee: 50,
      medicalInsurance: 20,
      departmentFee: 70,
    },
    get amount() {
      // Calculate the total amount by summing up all fees
      return Object.keys(this.fees).reduce((total, key) => {
        return total + this.fees[key];
      }, 0);
    },
    get minimumAmount() {
      return this.amount * this.minimumPercentage;
    },
  },
  lvl300: {
    minimumPercentage: 0.5,
    fees: {
      schoolFee: 2550,
      srcFee: 50,
      medicalInsurance: 20,
      departmentFee: 70,
    },
    get amount() {
      // Calculate the total amount by summing up all fees
      return Object.keys(this.fees).reduce((total, key) => {
        return total + this.fees[key];
      }, 0);
    },
    get minimumAmount() {
      return this.amount * this.minimumPercentage;
    },
  },
  lvl400: {
    minimumPercentage: 0.5,
    fees: {
      schoolFee: 2550,
      srcFee: 50,
      medicalInsurance: 20,
      departmentFee: 70,
    },
    get amount() {
      // Calculate the total amount by summing up all fees
      return Object.keys(this.fees).reduce((total, key) => {
        return total + this.fees[key];
      }, 0);
    },
    get minimumAmount() {
      return this.amount * this.minimumPercentage;
    },
  },
};

const cateringFeeStructure: FeeStructure = {
  lvl100: {
    minimumPercentage: 0.8,
    fees: {
      schoolFee: 2550,
      srcFee: 50,
      medicalInsurance: 100,
      departmentFee: 70,
    },
    get amount() {
      // Calculate the total amount by summing up all fees
      return Object.keys(this.fees).reduce((total, key) => {
        return total + this.fees[key];
      }, 0);
    },
    get minimumAmount() {
      return this.amount * this.minimumPercentage;
    },
  },
  lvl200: {
    minimumPercentage: 0.7,
    fees: {
      schoolFee: 2550,
      srcFee: 50,
      medicalInsurance: 100,
      departmentFee: 70,
    },
    get amount() {
      // Calculate the total amount by summing up all fees
      return Object.keys(this.fees).reduce((total, key) => {
        return total + this.fees[key];
      }, 0);
    },
    get minimumAmount() {
      return this.amount * this.minimumPercentage;
    },
  },
  lvl300: {
    minimumPercentage: 0.5,
    fees: {
      schoolFee: 2550,
      srcFee: 50,
      medicalInsurance: 100,
      departmentFee: 70,
    },
    get amount() {
      // Calculate the total amount by summing up all fees
      return Object.keys(this.fees).reduce((total, key) => {
        return total + this.fees[key];
      }, 0);
    },
    get minimumAmount() {
      return this.amount * this.minimumPercentage;
    },
  },
  lvl400: {
    minimumPercentage: 0.5,
    fees: {
      schoolFee: 2550,
      srcFee: 50,
      medicalInsurance: 100,
      departmentFee: 70,
    },
    get amount() {
      // Calculate the total amount by summing up all fees
      return Object.keys(this.fees).reduce((total, key) => {
        return total + this.fees[key];
      }, 0);
    },
    get minimumAmount() {
      return this.amount * this.minimumPercentage;
    },
  },
};

const feeStructure: FeeStructure = {
  media: mediaFeeStructure,
  cosmetology: mediaFeeStructure,
  catering: cateringFeeStructure,
  fashion: mediaFeeStructure,
  technology: mediaFeeStructure,
};

export default feeStructure;
