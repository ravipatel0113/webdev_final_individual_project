function getRequestParams(email) {
    // const API_KEY = process.env.MAILCHIMP_API_KEY;
    // const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  
    // const DATACENTER = API_KEY.split("-")[1];
    // const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const MailchimpKey = process.env.MAILCHIMP_API_KEY;
    const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
    const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID;

    const url = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;
  
    const data = {
      email_address: email,
      status: "subscribed",
    };
  
    const base64ApiKey = Buffer.from(`anystring:${MailchimpKey}`).toString("base64");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${base64ApiKey}`,
    };
  
    return { url, data, headers };
}  

export default async function handler(req, res) {
  const email = req.body;

  if (!email || !email.length) {
    res.status(200).json({ error: "Please enter a email address" });
  }
  try {
    const { url, data, headers } = getRequestParams(email);

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email_address: data.email_address,
        status: data.status,
      }),
    });

    res.status(200).json({
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      error:
        "Please try again!!",
    });
  }
}
