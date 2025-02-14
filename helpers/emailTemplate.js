module.exports = generateEmailTemplate = ({
	firstName,
	lastName,
	email,
	phone,
	link,
	title,
}) => {
	return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>User Information Email</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" bgcolor="#f4f4f4" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <table width="600" align="center" bgcolor="#ffffff" cellpadding="20" cellspacing="0" style="border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td align="center" style="background-color: #007bff; padding: 15px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                  <h2 style="color: #ffffff; margin: 0;">Applied User Information</h2>
                </td>
              </tr>

              <!-- User Details -->
              <tr>
                <td>
                  <p style="font-size: 16px; color: #333; line-height: 1.5; margin-bottom: 10px;">
                    Hello,
                  </p>
                  <p style="font-size: 14px; color: #555; line-height: 1.5;">
                    <strong>${firstName} ${lastName}</strong> has applied to your job ${title} Job
                  </p>
                  <table width="100%" cellpadding="5" cellspacing="0" style="margin-top: 10px;">
                    <tr>
                      <td style="font-weight: bold; color: #333;">Email:</td>
                      <td style="color: #007bff;">${email}</td>
                    </tr>
                    <tr>
                      <td style="font-weight: bold; color: #333;">Phone:</td>
                      <td>${phone}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Action Button -->
              <tr>
                <td align="center" style="padding: 20px;">
                  <a href="${link}" style="display: inline-block; padding: 12px 25px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Resume
                  </a>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="background-color: #f4f4f4; padding: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-size: 12px; color: #777;">
                  &copy; 2024 Linked In. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
