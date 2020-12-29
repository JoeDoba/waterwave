const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function validateEmails(recipients) {
    const invalidEmails = recipients
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

    if (invalidEmails[0] === ``) {
        return null;
    }
    if (invalidEmails.length) {
        return `Invalid emails: ${invalidEmails}`;
    }
    return null;
};