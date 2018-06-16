/**
 * Class used to handle the initial verification of a newly added webhook endpoint to Facebook. To be used with the GET
 * route as that is the method used by Facebook for token verification.
 */
export class ValidateWebhook {

    /* istanbul ignore next line */
  private constructor() {}

    /**
     * Method to be used if there is env variable FB_VERIFICATION_TOKEN added as it will extract it by itself.
     * @param req - The request object from server
     * @param res - The response object from server
     */
  public static validate(req:any, res: any) {
    const fbToken = process.env.FB_VERIFICATION_TOKEN;
    this.verifyToken(req, res, fbToken);
  }

    /**
     * Method to be used if verification token is passed in via another method/variable.
     * @param req - The request object from server
     * @param res - The response object from server
     * @param token - The Facebook token
     */
  public static validateWithToken(req: any, res: any, token: string) {
    this.verifyToken(req, res, token);
  }

  private static verifyToken(req: any, res: any, facebookToken?: string) {
    const tokenPresent = facebookToken != null;
    const remoteTokenPresent = req != null && typeof req.query !== 'undefined' && typeof req.query['hub.verify_token'] !== 'undefined';

    if (tokenPresent && remoteTokenPresent) {
      if (req.query['hub.verify_token'] === facebookToken) {
        res.status(200).send(req.query['hub.challenge']);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  }
}
