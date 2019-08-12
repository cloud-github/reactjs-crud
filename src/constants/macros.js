const MACRO_TYPES_OBJECT = {
  email: { label: "Email Macro", value: "email" },
  sms: { label: "SMS Macro", value: "sms" }
};

const MACRO_TYPES = Object.values(MACRO_TYPES_OBJECT);

const CHARCOUNTERMAX = 30; //1600

export { MACRO_TYPES, MACRO_TYPES_OBJECT, CHARCOUNTERMAX };
