import React from 'react';
import { Link } from 'react-router-dom';

import './userAgreement.scss';

import IMG from '../../utils/images';

const UserAgreement = () => {
  const [bgColor, setBgColor] = React.useState(false);

  React.useEffect(() => {
    const scrollElem = document.getElementById('privacy-content');
    scrollElem.addEventListener('scroll', () => {
      if (scrollElem.scrollTop > (window.innerWidth > 720 ? 238 : 160)) {
        setBgColor(true);
      } else {
        setBgColor(false);
      }
    });
  });
  return (
    <div className="user-agreement">
      <div className={bgColor ? 'privacy-header active' : 'privacy-header'}>
        <Link to="/">
          <img src={IMG.PRIVACY_LOGO} alt="" />
        </Link>
        {bgColor ? (
          <div className="header-privacy-title">END USER LICENSE AGREEMENT</div>
        ) : (
          ''
        )}
        <Link className="back-home" to="/">
          Back to Home
        </Link>
      </div>
      <div className="privacy-content" id="privacy-content">
        <div className="privacy-title">END USER LICENSE AGREEMENT</div>
        <div className="last-updated">Last updated: March 6, 2021</div>
        <div className="read-attention">
          PLEASE READ THESE TERMS OF SERVICE CAREFULLY. YOU ARE BOUND BY THIS
          AGREEMENT EVEN IF YOU DECIDE NOT TO READ IT.
        </div>
        <div className="privacy-detail">
          <p>
            This End User License Agreement (the “EULA”) governs access and use
            any Performlive mobile applications which you download from the
            iTunes Store or Google Play (the “Apps”) and of the website located
            at{' '}
            <a href="https://www.performlive.live" target="_blank">
              https://www.performlive.live
            </a>
            ,{'  '}
            <a href="https://www.Performlive.com" target="_blank">
              https://www.Performlive.com
            </a>{' '}
            (the “Site,” and together with the Apps, the “Services”). This EULA
            creates a binding agreement between you and ROAR IO Inc. d/b/a
            Performlive (“Performlive”, “we,” “us,” or “our”). If you accept or
            agree to this EULA on behalf of a company or other legal entity, you
            represent and warrant that you have the authority to bind that
            company or other legal entity to the Agreement and, in such event,
            “you” and “your” will refer and apply to that company or legal
            entity.
          </p>
          <p className="font-bold">
            YOU AGREE TO THIS EULA, AND OUR PRIVACY POLICY{' '}
            <a href="https://www.Performlive.live/privacy">
              https://www.Performlive.live/privacy
            </a>{' '}
            (THE “PRIVACY POLICY”, TOGETHER WITH THE EULA, THE “AGREEMENT”), BY
            DOWNLOADING AN APP, REGISTERING FOR AN ACCOUNT TO USE THE SERVICES,
            BY ACCESSING OR USING ANY PORTION OF THE SERVICES, BY CLICKING “I
            AGREE” (OR SOMETHING SIMILAR) OR OTHERWISE MANIFESTING YOUR ASSENT
            TO THE AGREEMENT. IF YOU DO NOT WITH TO BE BOUND BY THE AGREEMENT,
            DO NOT DOWNLOAD, ACCESS OR USE THE SERVICES.
          </p>
          <p className="font-bold">
            THIS EULA CONTAINS A BINDING ARBITRATION PROVISION AND CLASS ACTION
            WAIVER. READ CAREFULLY, INCLUDING YOUR RIGHT, IF APPLICABLE, TO OPT
            OUT OF ARBITRATION. EXCEPT FOR CERTAIN TYPES OF DISPUTES DESCRIBED
            IN BELOW, OR WHERE PROHIBITED BY LAW, BY ENTERING INTO THIS EULA YOU
            EXPRESSLY AGREE THAT DISPUTES BETWEEN YOU AND PERFORMLIVE WILL BE
            RESOLVED BY BINDING, INDIVIDUAL ARBITRATION, AND YOU HEREBY WAIVE
            YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-⁠WIDE
            ARBITRATION.
          </p>
          <p>
            This Agreement is effective as of the last updated date stated at
            the top. We may change this Agreement from time to time. Any such
            changes will be posted on the Site. By accessing the Services after
            we make any such changes to this Agreement, you are deemed to have
            accepted such changes. Please refer back to this Agreement on a
            regular basis.
          </p>
          <p>
            Capitalized terms not defined in this EULA shall have the meaning
            set forth in our Privacy Policy.
          </p>
        </div>
        <div className="privacy-info">
          <h3>OUR SERVICES AND USERS</h3>
          <p>
            The Services provide a platform where sellers (“Vendors”) can
            livestream and/or post videos to sell their products or services to
            consumers (“Buyers”). The Services are available only to individuals
            aged 16 years or older. If you are 16 or older, but under the age of
            majority in your jurisdiction, you should review this Agreement with
            your parent or guardian to make sure that you and your parent or
            guardian understand it and that they consent to you entering into
            it. If you are under the age of majority and your parent does not
            consent to you using the Service, you may not use it.
          </p>
          <p>
            <span className="text-underline">
              Our Services have several types of users
            </span>
            :
            <ul className="subSection">
              <li>
                <span className="text-underline">Visitors</span>. Visitors are
                people who merely access and explore the all publicly-available
                content and features of the Site but who do not create an
                account.
              </li>
              <li>
                <span className="text-underline">Registered Users</span>.
                <ul className="subSection">
                  <li>
                    In order to become a registered Vendor and/or a Buyer
                    (sometimes collectively or interchangeably referred to as
                    “Users”), you must create an account with us, which will
                    require you to create a password and user name or may
                    require you to login using your account with another social
                    media platform (“Performlive User ID”) and provide certain
                    additional information, including your name, address, other
                    information that will assist in authenticating your identity
                    when you log-in in the future (collectively “Login
                    Credentials”), credit, debit or charge card numbers or other
                    payment information and expiration dates. All information
                    that you provide must be accurate. You are responsible for
                    keeping such information up-to-date and must provide changes
                    promptly to your account page, which may be accessed at. Our
                    use of your information is governed by our Privacy Policy
                    <a href="https://www.Performlive.live/privacy">
                      https://www.Performlive.live/privacy
                    </a>
                    .
                  </li>
                  <li>
                    We may accept or reject your registration for any reason (or
                    no reason) in our sole discretion. If we reject your
                    registration, you may to try again at any time for our
                    reconsideration.
                  </li>
                  <li>
                    Each Performlive User ID and corresponding password can be
                    used by only one individual. You may not transfer your
                    account to anyone else without our prior written permission.
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your account Login Credentials. You are fully responsible
                    for all activities that are associated with your account
                    (including but not limited to any financial transactions,
                    Transaction (defined below), use of the Services, or
                    communications from your account to Performlive).
                  </li>
                  <li>
                    You will immediately notify us of any unauthorized use or
                    suspected unauthorized use of your account or any other
                    breach of security.
                  </li>
                </ul>
              </li>
            </ul>
          </p>
        </div>

        <div className="privacy-info">
          <h3>USER CONTENT; LICENSES</h3>
          <p>
            The Services allow Users to post, upload, and/or livestream content
            such as videos, photos, images, text, graphics, and other materials
            (collectively, “User Content”). Even if you are not a Vendor, as a
            Buyer you may have the opportunity to post User Content such as
            comments, product reviews, or other materials.
          </p>
        </div>
        <div className="privacy-info">
          <h3>No Objectionable or Harmful Content.</h3>
          <p className="font-bold">
            You will not provide and we will not tolerate any User Content that
            we believe (in our sole discretion) amounts to or that encourages,
            promotes, supports, allows or tolerates:
            <ul className="subSection">
              <li>
                discrimination, including discrimination based on age, race,
                sex, gender identity, religion, nationality, disability, veteran
                status, sexual orientation or any protected class;
              </li>
              <li>misinformation;</li>
              <li>violence or hate;</li>
              <li>the display of sexually explicit content;</li>
              <li>harassment, defamation or obscenity;</li>
              <li>an invasion of another’s privacy;</li>
              <li>disclosure of sensitive information about another person;</li>
              <li>
                violation of our intellectual property rights or those of
                others; or
              </li>
              <li>
                anything that we view as offensive, inappropriate, illegal or
                damaging to our goodwill, the Services, another user or an app
                provider.
              </li>
            </ul>
          </p>
          <p className="font-bold">
            You also will not introduce, post, or upload to the Services any
            Harmful Code. As used herein, “Harmful Code” means computer code,
            programs, or programming devices that are intentionally designed to
            disrupt, modify, access, delete, damage, deactivate, disable, harm,
            or otherwise impede in any manner, including aesthetic disruptions
            or distortions, the operation of the Services, or any other
            associated software, firmware, hardware, computer system, or network
            (including, without limitation, “Trojan horses,” “viruses,” “worms,”
            “time bombs,” “time locks,” “devices,” “traps,” “access codes,” or
            “drop dead” or “trap door” devices) or any other harmful, malicious,
            or hidden procedures, routines or mechanisms that would cause the
            Services to cease functioning or to damage or corrupt data, storage
            media, programs, equipment, or communications, or otherwise
            interfere with the operations of the Services.
          </p>
          <p className="font-bold">
            Within twenty-four (24) hours after we learn of User Content that
            (1) we believe in our sole discretion violates this EULA, our
            policies, the policies of App Providers or applicable law or (2)
            that an app provider informs us must be removed ((1) and (2)
            collectively, “objectionable content”), we will remove such
            objectionable Content and will have no liability to you for such
            removal. In addition to removing OBJECTIONABLE Content, we may also
            immediately suspend or terminate your right to use the Services in
            our sole discretion and without liability to you. we may also use
            automated methods to identify and remove OBJECTIONABLE Content and
            will have no liability to you for such removal.
          </p>

          <p>
            If you believe that another User has posted Objectionable Content or
            if you are a User who objects to our removal of your User Content
            (or related actions such as suspension or termination), please
            register a complaint with us at{' '}
            <a href="legal@Performlive.com" target="_blank">
              legal@Performlive.com
            </a>{' '}
            and we will in good faith consider your complaint and take such
            actions that we deem appropriate in our sole discretion to protect
            PerformLive, the App Providers, our community and the Services.
          </p>
        </div>

        <div className="privacy-info">
          <h3>Representations about User Content.</h3>
          <p>
            If you submit User Content to us, each such submission constitutes a
            representation and warranty to Performlive that (i) you have
            received all necessary releases and consent from all individuals
            that appear in the User Content, and (ii) such User Content is your
            original creation (or that you otherwise have the right to provide
            the User Content), that you have the rights necessary to grant the
            license to the User Content under the prior paragraph, and that the
            User Content and its use by Performlive and our content partners as
            permitted by this Agreement does not and will not infringe,
            misappropriate, or otherwise violate the intellectual property
            rights, moral rights, or rights of privacy or publicity of any
            person, or contain any libelous, defamatory, or obscene material or
            content that violates the Agreement. You agree to defend, indemnify,
            and hold us, our affiliates, and our and their respective owners,
            members, officers, directors, employees, agents, successors,
            licensees, licensors, and assigns harmless from and against any
            damages, liabilities, losses, expenses, claims, actions, and/or
            demands, including, without limitation, reasonable legal and
            accounting fees, arising or resulting from your breach of the
            representations and warranties in this paragraph.
          </p>
          <p>
            You expressly acknowledge and agree that once you submit your User
            Content for inclusion into the Services, there is no confidentiality
            or privacy with respect to such User Content, including, without
            limitation, any personally identifying information that you may make
            available.{' '}
            <span className="font-bold">
              YOU, AND NOT Performlive, ARE ENTIRELY RESPONSIBLE FOR ALL YOUR
              USER CONTENT THAT YOU UPLOAD, POST, LIVESTREAM, E-MAIL, OR
              OTHERWISE TRANSMIT VIA THE SERVICES.
            </span>{' '}
            We are not obligated to publish any User Content on our Services,
            and we reserve the right to remove any User Content at any time in
            our sole discretion, with or without notice.
          </p>
        </div>
        <div className="privacy-info">
          <h3>Ownership of User Content.</h3>
          <p>
            You retain all copyrights and other intellectual property rights in
            and to your own User Content. You do, however, hereby grant us and
            our sublicensees a non-exclusive, royalty-free, freely
            sublicensable, perpetual, irrevocable license to modify, compile,
            combine with other content, copy, record, synchronize, transmit,
            translate, format, distribute, publicly display, publicly perform,
            and otherwise use or exploit (including for profit) your User
            Content and all intellectual property and moral rights therein
            throughout the universe, in each case, by or in any means, methods,
            media, or technology now known or hereafter devised, subject to
            certain limitations related to Vendor Marks (as defined), as set
            forth below. We may but are not required to provide any attribution
            to you in connection with your User Content.
          </p>
          <p>
            To the extent you are a Vendor and your name, trademarks, trade
            names, service marks, and/or logos (“Vendor Marks”) are published or
            displayed on the Services as part of its User Content (including,
            but not limited to, in connection with the sale of its products or
            services), the Vendor hereby grants Performlive and our sublicensees
            a non-exclusive, royalty-free, freely sublicensable, perpetual
            license to copy, transmit, format, distribute, publicly display,
            publicly perform, and otherwise use such Vendor Marks solely in
            connection with our provision of the Services and operation of the
            Site. Vendors represent and warrant that the Vendor Marks are owned
            by the Vendor or that the Vendor has all rights necessary to grant
            us the foregoing license, and that the Vendor Marks, and their use
            by Performlive as permitted herein, do not and will not infringe or
            misappropriate the intellectual property rights of any third party.
          </p>
        </div>

        <div className="privacy-info">
          <h3>PERSONAL RELEASE</h3>
          <p>
            AS A VENDOR, YOU UNDERSTAND THAT Performlive WISHES TO OBTAIN THE
            RIGHT TO RECORD AND USE YOUR NAME, IMAGE, PICTURE, PHOTOGRAPH,
            BIOGRAPHY, LIKENESS, VOICE, PERFORMANCE, AND/OR OTHER PERSONAL
            IDENTIFICATION PROVIDED BY YOU TO Performlive, WHETHER AS PART OF
            YOUR CONTRIBUTED USER CONTENT OR OTHERWISE (COLLECTIVELY, THE
            “MATERIAL”), ON VIDEOTAPE, FILM, OR ANY OTHER AUDIO AND/OR VISUAL
            MEDIUM FOR USE IN CONNECTION WITH PROMOTING Performlive, THE
            SERVICES, AND VENDOR (“PROMOTION”). AS SUCH, VENDOR GRANTS
            Performlive AND OUR SUBSIDIARIES, AFFILIATES, AGENTS, NOMINEES,
            LICENSEES, SUCCESSORS AND ASSIGNS, AND THOSE ACTING WITH OUR
            AUTHORITY (“AFFILIATES”), THE UNRESTRICTED, ABSOLUTE, PERPETUAL,
            WORLDWIDE RIGHT TO RECORD, REPRODUCE, COPY, EDIT, ADD TO, SUBTRACT
            FROM, MODIFY, USE, REUSE, DISPLAY, PERFORM, EXHIBIT, DISTRIBUTE,
            TRANSMIT, EXPLOIT, AND/OR BROADCAST THE MATERIAL, WITHOUT
            LIMITATION, IN AND IN CONNECTION WITH THE PROMOTION IN ANY MANNER,
            IN WHOLE OR IN PART, ALONE OR IN COMBINATION WITH ANY OTHER IMAGES
            OR VIDEOS, IN ANY MEDIA NOW KNOWN OR HEREAFTER DEVISED. SUCH USE MAY
            ALSO INCLUDE ADVERTISING AND PROMOTION IN ANY MANNER OR MEDIA IN
            CONNECTION WITH THE PROMOTION.
          </p>
          <p>
            VENDOR AGREES THAT Performlive HAS NO OBLIGATION TO USE ANY OF THE
            MATERIAL, OR TO EXERCISE ANY RIGHT GRANTED HEREIN, AND THAT VENDOR
            MAY NOT ENJOIN ANY EXPLOITATION OF THE PROMOTION AS PROVIDED ABOVE.
            IF Performlive USES MATERIAL FOR PROMOTION, VENDOR ACKNOWLEDGES THAT
            ITS RIGHT TO ACCESS AND USE THE SERVICES AND THE SERVICES AS GRANTED
            IN THIS AGREEMENT SHALL BE THE SOLE COMPENSATION AND CONSIDERATION
            FOR THE RIGHTS VENDOR IN AND TO THE MATERIALS THAT IS GRANTING
            HEREUNDER. VENDOR SHALL NOT BE ENTITLED TO ANY ADDITIONAL
            COMPENSATION HEREUNDER, INCLUDING, BUT NOT LIMITED TO, IN THE EVENT
            Performlive COMMERCIALIZES THE MATERIAL OR THE PROMOTION.
          </p>
          <p>
            VENDOR HEREBY UNCONDITIONALLY AND FOREVER RELEASES, INDEMNIFIES, AND
            HOLDS HARMLESS Performlive AND OUR AFFILIATES FROM ANY AND ALL
            LIABILITY, CLAIMS, OR ACTIONS THAT ARISE FROM USE OF THE MATERIAL,
            OR THAT VENDOR OR VENDOR’S HEIRS, EXECUTORS, ADMINISTRATORS, OR
            ASSIGNS MAY HAVE OR CLAIM TO HAVE IN CONNECTION WITH USE OF THE
            MATERIAL AS DESCRIBED HEREIN, AND VENDOR AGREES NOT TO SUE OR BRING
            ANY PROCEEDING AGAINST ANY OF THOSE PARTIES FOR ANY CLAIM OR CAUSE
            OF ACTION, WHETHER PRESENTLY KNOWN OR UNKNOWN, INCLUDING, BUT NOT
            LIMITED TO ACTIONS FOR DEFAMATION, INVASION OF VENDOR’S RIGHTS TO
            PRIVACY, PUBLICITY OR PERSONALITY OR ANY SIMILAR MATTER, OR BASED
            UPON OR RELATING TO THE EXERCISE OF ANY OF THE RIGHTS REFERRED TO
            HEREIN.
          </p>
        </div>

        <div className="privacy-info">
          <h3>PURCHASE TERMS.</h3>
          <p>
            <ul className="subSection">
              <li>
                <span className="text-underline">Orders;</span> Order
                Acceptance. Buyers may place orders for Vendors’ products and
                services through our Services and Vendors may sell their
                products and/or services through our Services to Buyers (each,
                purchase or sale of products and services, a “Transaction”). The
                receipt of an order number or an email or other order
                confirmation does not constitute Performlive’s or any Vendor’s
                acceptance of an order or a confirmation of an offer to sell
                Vendors and Performlive reserve the right to refuse service to
                any Buyer or cancel an order for any reason. Verification of
                information may be required prior to the acceptance of an order.
                Prices and availability of products and services are subject to
                change without notice. Buyers agree that by placing an order
                through the Services, you are entering into a binding contract
                and agree to pay all charges that may be incurred by you or on
                your behalf through the Services, at the price(s) in effect when
                such charges are incurred including, without limitation, all
                shipping and handling charges. In addition, you remain
                responsible for any taxes that may be applicable to your
                Transactions. Your total price will include the price of the
                product(s) or service(s) plus any applicable sales tax; such
                state and local sales tax is based on the shipping address and
                the sales tax rate in effect at the time you purchase the
                product(s) or service(s). Such taxes will be imposed only in
                states where the goods sold over the internet are taxable. The
                Vendor will be responsible for collecting and remitting those
                taxes and indemnifies Performlive for all such taxes. If you are
                purchasing a product you will also be charged for the cost of
                shipping the product to you.
              </li>
              <li>
                <span className="text-underline">Shipping;</span> Risk of Loss.
                Vendors use third-party carriers selected by them to deliver
                products to Buyers. As noted above, Buyers are responsible for
                the cost of all shipping. Performlive is not liable for any
                damages (including, without limitation, any incidental or
                consequential damages) arising from a Vendor’s failure to
                deliver or delay in delivering products purchased through the
                Services. Title and risk of loss to the products will pass to
                Buyer upon delivery by Vendor to the shipping carrier.
                Performlive has no responsibility for shipping and Buyer’s must
                look solely to Vendors for any shipping issues.
              </li>
              <li>
                <span className="text-underline">Errors</span>. All
                descriptions, images, references, features, content,
                specifications, and prices of products and services described or
                depicted on the Services are subject to change at any time
                without notice. Certain weights, measures, and other
                descriptions are approximate and are provided for convenience
                purposes only. From time to time, there may be information on
                the Services that contains typographical errors, inaccuracies,
                or omissions that may relate to product and service
                descriptions, product and service prices, promotions, offers,
                and availability. Performlive and Vendor each reserve the right
                to correct any errors, inaccuracies or omissions, and to change
                or update information or cancel orders, if any information on
                the Services is inaccurate at any time without prior notice,
                even after Buyer has received an order confirmation or shipping
                notification. The inclusion of any products or services on the
                Services does not imply or warrant that these products or
                services will be available. Vendors reserve the right to revise
                their product and services and/or discontinue products and
                services at any time without notice. Vendors and Performlive
                also reserve the right to limit quantities purchased, and to
                revise, suspend, or terminate an event or promotion at any time
                without notice (including after an order has been submitted or
                acknowledged).
              </li>
              <li>
                <span className="text-underline">Payment</span>. Where
                applicable, Buyers shall pay all purchase prices, taxes,
                shipping and handling, and other fees in connection with
                products and services purchased in the manner specified on or
                selected through the Services. Payment is due immediately upon
                to complete a Transaction. By entering into a Transaction, Buyer
                is agreeing to pay Performlive, through our selected payment
                processor(s) or means (“Payment Processor”), all charges at the
                prices then in effect for such Transaction in accordance with
                the applicable payment terms provided by Vendor. If Buyer has a
                card or other payment method on file with its account on the
                Services, by placing an order Buyer may be authorizing us,
                through our Payment Processor, to charge such account for the
                Transaction amount.{' '}
                <span className="font-bold">
                  BUYERS MUST PROVIDE CURRENT, COMPLETE, AND ACCURATE
                  INFORMATION FOR THEIR ACCOUNTS, AND PROMPTLY UPDATE ALL
                  INFORMATION TO KEEP SUCH ACCOUNT INFORMATION CURRENT,
                  COMPLETE, AND ACCURATE (SUCH AS A CHANGE IN BILLING ADDRESS,
                  CREDIT CARD NUMBER, OR CREDIT CARD EXPIRATION DATE). FURTHER,
                  BUYERS MUST PROMPTLY NOTIFY US IF A PAYMENT METHOD IS CANCELED
                  (E.G., FOR LOSS OR THEFT) OR IF BUYER BECOMES AWARE OF A
                  POTENTIAL BREACH OF SECURITY, SUCH AS THE UNAUTHORIZED
                  DISCLOSURE OR USE OF BUYER’S USER NAME OR PASSWORD. CHANGES TO
                  SUCH INFORMATION CAN BE MADE AT BUYER’S ACCOUNT PAGE.
                </span>
              </li>
              <li>
                <span className="text-underline">Clarification</span>. The
                Services merely facilitate Transactions and we do not sell or
                purchase any goods or provide or offer any services and do not
                take possession of the goods or manage any services. While we
                may help facilitate Transactions, Buyers and Vendors are
                entirely responsible for the Transactions between them. Except
                for amounts we owe to Vendors hereunder, we have no
                responsibility or liability with respect to any Transactions and
                Vendors and Buyers release us of any such responsibility and
                liability.
              </li>
            </ul>
          </p>
        </div>

        <div className="privacy-info">
          <h3>VENDOR TERMS.</h3>
          <p>
            <ul className="subSection">
              <li>
                Vendor User Content. When Vendor posts or livestreams User
                Content, such User Content will only remain on the Service for a
                period of 24-36 hours following the livestream, during which
                time Buyers may engage in Transactions with that Vendor. Vendor
                represents and warrants to Performlive that any claims about
                products and services of Vendor or contained in Vendor’s User
                Content have been substantiated and comply with all applicable
                laws, rules, and regulations including FTC guidelines and other
                consumer protection laws and regulations.
              </li>
              <li>
                Orders; Shipping. Orders are placed by Buyers with Performlive.
                Performlive shall receive the order information and the Buyer’s
                shipping information. Performlive shall provide Vendors with
                shipping labels for goods or other information necessary to
                provide services within twelve (12) hours of Buyer making a
                purchase. Vendor shall ship all Services orders directly to
                Buyers and shall provide all services through the Service. Other
                than the limited information necessary to engage in
                Transactions, all Buyer information shall be held exclusively by
                Performlive, in accordance with our Privacy Policy, and Vendor
                shall not have the ability to communicate with Buyers without
                going through Performlive. Vendor may contact Performlive for
                any questions about the Transaction, and Performlive will
                communicate with the Buyer to provide answers to Vendor if
                necessary. Performlive strongly urges Vendors to obtain and
                maintain insurance for your shipments. Performlive is not liable
                for any product or service delivery issues. All sales are final
                and we do not accept returns or provide refunds.
              </li>
              <li>
                Payments; Accounts. Our Payment Processor collects payments from
                Buyers and passes the amounts through to Performlive, subject to
                a processing period. After Performlive receives payment from
                Payment Processor for the Purchase, Performlive in turn shall
                pass these amounts to Vendor, less a commission and transaction
                fees due to Performlive as agreed to by the parties pursuant to
                this Agreement or a separate written agreement. Commission fees
                shall be between six percent (5%) to nine percent (8%). A per
                transaction fee of between $0.99 to $1.99 applies to all product
                Purchase, defined as physical and digital goods being sold via
                Performlive. Vendor acknowledges and agrees that there is
                usually a delay between when the Buyer pays for a Purchase and
                when Performlive receives payment via Payment Processor, and,
                therefore, there will be an additional delay passing payments
                through to Vendor. To receive payment, Vendor must: (i) have
                provide us with bank account information (“Payment Account”),
                and (ii) share the necessary Payment Account details with
                Performlive to enable Performlive to send Vendor payments by
                wire, ACH or other bank transfer. If there is any cost to
                transfer money to Vendor, Performlive may deduct that amount
                from the payment to Vendor. By signing up for the Services and
                designating a Payment Account, Vendor hereby agrees to
                Performlive making deposits into Vendor’s Payment Account for
                payments received by Performlive for the sale of Vendor products
                and services, less any commission + transaction fees due to
                Performlive in connection therewith.{' '}
                <span className="font-bold">
                  VENDORS MUST MAINTAIN ACTIVE PAYMENT ACCOUNTS TO RECEIVE
                  PAYMENT FOR SALES, AND MUST PROVIDE CURRENT, COMPLETE, AND
                  ACCURATE INFORMATION FOR THEIR PAYMENT ACCOUNTS, AND PROMPTLY
                  UPDATE ALL INFORMATION TO KEEP SUCH PAYMENT ACCOUNT
                  INFORMATION CURRENT, COMPLETE, AND ACCURATE. FURTHER, VENDORS
                  MUST PROMPTLY NOTIFY US IF VENDOR BECOMES AWARE OF A POTENTIAL
                  BREACH OF SECURITY, SUCH AS THE UNAUTHORIZED DISCLOSURE OR USE
                  OF VENDOR’S PAYMENT ACCOUNT.
                </span>{' '}
              </li>
              <li>
                Performance Metrics. Performlive cares deeply about customer
                satisfaction. Accordingly, we reserve the right to track and
                measure Vendors’ use of the Services and performance in
                accordance with this Agreement. We reserve the right to track
                order fulfillment, Buyer complaints, shipping times,
                cancellation/request for return rates and chargebacks, backorder
                issues, and related logistics and performance issues. These
                metrics help us determine whether a Vendor is meeting our and
                our Buyers’ expectations. If we determine, in our sole
                discretion, that Vendor is not meeting our performance
                standards, is in violation of this Agreement, or for other
                reasons, we reserve the right to suspend or remove your account
                with the Services.
              </li>
              <li>
                Warranty. Vendor hereby represents and warrants to Performlive
                and to Buyers that products sold or offered through our Services
                (i) are and shall be manufactured, packaged, and labelled in
                accordance with all applicable federal, state, local, and
                international laws, rules, and regulations, (ii) are not and
                will not be adulterated or misbranded, and (iii) shall be free
                from defects in materials, workmanship, and fabrication.
                Performlive does not make any representations or warranties
                regarding the products. Vendor hereby represents and warrants to
                Performlive and to Buyers that services sold or offered through
                our Services will be professional and will conform to generally
                accepted industry standards related to such services. Vendor
                further represents and warrants that it will at all times comply
                with this Agreement and all applicable laws, rules, and
                regulations.
              </li>
            </ul>
          </p>
          <p>
            NO CIRCUMVENTION. All orders are passed through Performlive, and
            Performlive disseminates to Users only the necessary information for
            Users to purchase, ship, and receive products and services, and no
            additional information about any other Users. Neither Vendors nor
            Buyers may circumvent the Services to transact directly with one
            another, and we may suspend accounts that we suspect, in our sole
            discretion, are intentionally circumventing the Services.
          </p>
        </div>

        <div className="privacy-info">
          <h3>INTELLECTUAL PROPERTY.</h3>
          <p>
            The Services are protected by copyright, trademark, and other laws
            of the United States and foreign countries. Except as expressly
            provided in this Agreement, Performlive and our licensors
            exclusively own all right, title, and interest in and to the
            Services, including all associated intellectual property rights. You
            will not remove, alter, or obscure any copyright, trademark, service
            mark, or other proprietary rights notices incorporated in or
            accompanying the Services.
          </p>
          <p>
            The Services contains material, such as software, text, graphics,
            images, and other material provided by or on behalf of Performlive
            (collectively referred to as the “Content”). The Content may be
            owned by us or third parties. The Content is protected under both
            United States and foreign laws. Unauthorized use of the Content may
            violate copyright, trademark, and other laws.
          </p>
          <p>
            We and our licensors retain all right, title, and interest,
            including all intellectual property rights, in and to the Content.
            You must retain all copyright and other proprietary notices
            contained in the original Content. You may not sell, transfer,
            assign, license, sublicense, or modify the Content or reproduce,
            display, publicly perform, make a derivative version of, distribute,
            or otherwise use the Content in any way for any public or commercial
            purpose.
          </p>
          <p>
            The trademarks, service marks, and logos of Performlive (the
            “Performlive Trademarks”) used and displayed on the Services are
            registered and unregistered trademarks or service marks of
            Performlive. Other company, product, and service names located on
            the Services may be trademarks or service marks owned by third
            parties (the “Third-Party Trademarks,” and, collectively with
            Performlive Trademarks, the “Trademarks”). Nothing on the Services
            should be construed as granting, by implication, estoppel, or
            otherwise, any license or right to use the Trademarks, without our
            prior written permission specific for each such use. Use of the
            Trademarks as part of a link to or from any site is prohibited
            unless establishment of such a link is approved in advance by us in
            writing. All goodwill generated from the use of Performlive
            Trademarks inures to our benefit.
          </p>
          <p>
            Elements of the Services are protected by trade dress, trademark,
            unfair competition, and other state and federal laws and may not be
            copied or imitated in whole or in part, by any means, including, but
            not limited to, the use of framing or mirrors. None of the Content
            may be retransmitted without our express, written consent for each
            and every instance.
          </p>
          <p>
            FEEDBACK. If you make suggestions to us or through the Services
            about improving or adding new features or products or services to
            the Services or you otherwise provide feedback, product or service
            reviews or testimonials, you hereby grant to us a worldwide,
            perpetual, irrevocable, non-exclusive, sublicensable (through
            multiple tiers), transferable royalty-free license and right to use,
            copy, modify, create derivative works based upon and otherwise
            exploit your suggestions, feedback, reviews and testimonials for any
            purpose (including for marketing), without any notice, compensation
            or other obligation to you.
          </p>
          <p>
            USAGE RIGHTS AND RESTRICTIONS. Subject to the terms and conditions
            of this Agreement, Performlive grants you a limited,
            non-transferable, non-exclusive, license to access and use the
            Services solely for your personal purposes. Performlive may
            terminate this license at any time for any reason. Further, when
            using or accessing the Services, you agree that:
            <ul className="subSection">
              <li>
                You will comply with all applicable laws in your use of the
                Services and will not use the Services for any unlawful purpose;
              </li>
              <li>
                You will not access or use the Services to collect any market
                research for a competing business;
              </li>
              <li>
                You will not impersonate any person or entity or falsely state
                or otherwise misrepresent your affiliation with a person or
                entity;
              </li>
              <li>
                You will not interfere with, or attempt to interrupt the proper
                operation of, the Services through the use of any virus, device,
                information collection or transmission mechanism, software or
                routine, or access or attempt to gain access to any Content,
                data, files, or passwords related to the Services through
                hacking, password or data mining, or any other means;
              </li>
              <li>
                You will not decompile, reverse engineer, or disassemble any
                software or other product or service s or processes accessible
                through the Services;
              </li>
              <li>
                You will not reproduce, distribute or make the Services
                available over a network where it could be used by multiple
                devices at the same time. You may not rent, lease, lend, sell,
                redistribute or sublicense the Services;{' '}
              </li>
              <li>
                You will not attempt to disable or circumvent any security or
                other technological measure designed to protect the App or
                Website or any content available through the App or Website;
              </li>
              <li>
                You will not cover, obscure, block, or in any way interfere with
                any advertisements and/or safety features on the Services;
              </li>
              <li>
                You will not use any robot, spider, scraper, or other automated
                means to access the Services for any purpose without our express
                written permission;
              </li>
              <li>
                You will not take any action that imposes or may impose (in our
                sole discretion) an unreasonable or disproportionately large
                load on our technical infrastructure;
              </li>
              <li>
                You will not allow anyone to access and use your account; and
              </li>
              <li>
                You will not remove or modify any proprietary markings or
                restrictive legends placed on the Services; and
              </li>
            </ul>
          </p>
        </div>

        <div className="privacy-info">
          <h3>TERMINATION AND SUSPENSION</h3>
          <p>
            <ul className="subSection">
              <li>
                Suspension or Termination by Performlive
                <ul className="subSection">
                  <li>
                    We reserve the right to change, suspend or discontinue any
                    of its Services, in whole or in part at any time for any
                    reason, without notice (unless required by law) and without
                    any liability to you.
                  </li>
                  <li>
                    We may refuse Services to anyone and may terminate or
                    suspend your account (and any related accounts) and your
                    access to the Service in whole or in part at any time, for
                    any reason, without notice (unless required by law).
                  </li>
                </ul>
              </li>
              <li>
                Termination by You. You may terminate your account with us at
                any time from your account settings.
              </li>
              <li>
                Effect of Suspension or Termination. In connection with any
                suspension termination:
                <ul className="subSection">
                  <li>
                    You remain responsible for all fees, chargebacks/payment
                    reversals or refunds received by us, even after suspension
                    or termination. You also remain obligated to resolve any
                    disputes with other Users that arise from any activity on
                    through the Services prior to suspension or termination.
                  </li>
                  <li>
                    Your access to the Service will immediately cease, with no
                    liability to us, and you will have no further right to sell
                    or buy on or through the Services.
                  </li>
                  <li>
                    We will not be liable to you for the effect that any changes
                    to the Service may have on you, including your income or
                    your ability to generate revenue through the Service.
                  </li>
                  <li>
                    We may hold funds for up to 180 days to seek reimbursement
                    from a Vendor in any of the following circumstances: When
                    (a) we provide a refund to a Buyer because a Vendor did not
                    deliver the goods or we otherwise determine that a refund is
                    warranted in a particular circumstance; (b) we discover
                    erroneous or duplicate transactions related to a Vendor; (c)
                    we receive a chargeback or payment reversal from a Buyer's
                    Payment Instrument issuer for the amount of a Buyer's
                    purchase from a Vendor; or (d) a Vendor does not act in
                    accordance with the Agreement
                  </li>
                  <li>
                    We may obtain reimbursement of any amounts owed by a Vendor
                    to us by deducting from future payments owed to the Vendor,
                    reducing any credits from the Vendor’s account balance,
                    charging any of the Vendor's payment instrument(s) on file,
                    or seeking reimbursement from the Vendor by any other lawful
                    means, including by using third-party collections services.
                    You authorize us to use any or all of these methods to seek
                    reimbursement.
                  </li>
                  <li>
                    We will issue refunds or make other payments owed to you, as
                    required by applicable law or regulation.
                  </li>
                </ul>
              </li>
            </ul>
          </p>
        </div>

        <div className="privacy-info">
          <h3>DIGITAL MILLENNIUM COPYRIGHT ACT</h3>
          <p>
            Performlive respects the intellectual property rights of others and
            attempts to comply with all relevant laws. We will review all claims
            of copyright infringement received and remove any Content or User
            Content deemed to have been posted or distributed in violation of
            any such laws.
          </p>
          <p>
            Our designated agent under the Digital Millennium Copyright Act (the
            “Act”) for the receipt of any Notification of Claimed Infringement
            which may be given under that Act is as follows:
            <a href="mailto:legal@Performlive.com">legal@Performlive.com</a>.
          </p>
          <p>
            If you believe that your work has been copied on the Services in a
            way that constitutes copyright infringement, please provide our
            agent with notice in accordance with the requirements of the Act,
            including (i) a description of the copyrighted work that has been
            infringed and the specific location on the Services where such work
            is located; (ii) a description of the location of the original or an
            authorized copy of the copyrighted work; (iii) your address,
            telephone number and e-mail address; (iv) a statement by you that
            you have a good faith belief that the disputed use is not authorized
            by the copyright owner, its agent or the law; (v) a statement by
            you, made under penalty of perjury, that the information in your
            notice is accurate and that you are the copyright owner or
            authorized to act on the copyright owner’s behalf; and (vi) an
            electronic or physical signature of the owner of the copyright or
            the person authorized to act on behalf of the owner of the copyright
            interest.
          </p>
        </div>
        <div className="privacy-info">
          <h3>COMMUNICATIONS DECENCY ACT NOTICE</h3>
          <p>
            Performlive is a provider of “interactive computer services” as
            defined under the Communications Decency Act, 47 U.S.C. Section 230,
            and as such, our liability for defamation, libel, product
            disparagement, and other claims arising out of any User Content is
            limited as described therein. We are not responsible for any User
            Content. We neither warrant the accuracy of the User Content nor
            exercise any editorial control over User Content, nor do we assume
            any legal obligation for editorial control of User Content or
            liability in connection with User Content, including any
            responsibility or liability for investigating or verifying the
            accuracy of any User Content.
          </p>
        </div>

        <div className="privacy-info">
          <h3>NO WARRANTIES; LIMITATION OF LIABILITY.</h3>
          <p className="font-bold">
            THE SERVICES, AND ALL CONTENT AND OTHER INFORMATION ON OR ACCESSIBLE
            FROM OR THROUGH THE SERVICES ARE PROVIDED BY Performlive ON AN “AS
            IS” AND “AS AVAILABLE” BASIS WITHOUT WARRANTY OF ANY KIND, EITHER
            EXPRESS OR IMPLIED. Performlive EXPRESSLY DISCLAIMS ALL WARRANTIES,
            EXPRESS OR IMPLIED, REGARDING THE SERVICES, THE CONTENT, AND ALL
            PRODUCTS and services OFFERED BY VENDORS THROUGH THE SERVICES,
            INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
            FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, SECURITY OR ACCURACY,
            AND ANY WARRANTIES ARISING FROM COURSE OF DEALING, COURSE OF
            PERFORMANCE, OR USAGE OF TRADE. WITHOUT LIMITING THE GENERALITY OF
            THE FOREGOING, Performlive DOES NOT WARRANT THAT: (1) THE
            INFORMATION ON THE SERVICES IS CORRECT, ACCURATE OR RELIABLE; (2)
            THE FUNCTIONS CONTAINED ON THIS SERVICES WILL BE UNINTERRUPTED OR
            ERROR-FREE; OR (3) DEFECTS WILL BE CORRECTED, OR THAT THE SERVICES
            OR THE SERVER THAT MAKE THEM AVAILABLE IS FREE OF VIRUSES OR OTHER
            HARMFUL COMPONENTS.
          </p>
          <p className="font-bold">
            YOU UNDERSTAND THAT Performlive DOES NOT MANUFACTURE, STORE, OR
            INSPECT ANY OF THE PRODUCTS or services SOLD OR OFFERED FOR
            PLACEMENT THROUGH OUR SERVICES. WE PROVIDE THE VENUE; THE PRODUCTS
            OR SERVICEs ARE PRODUCED, LISTED, SOLD, AND OFFERED DIRECTLY BY
            VENDORS, AND, ACCORDINGLY, Performlive CANNOT AND DOES NOT MAKE ANY
            WARRANTIES ABOUT THEIR QUALITY, SAFETY, OR EVEN THEIR LEGALITY. AS A
            BUYER, ANY LEGAL CLAIM RELATED TO A PRODUCT or service YOU PURCHASE
            THROUGH THE SERVICES MUST BE BROUGHT DIRECTLY AGAINST THE VENDOR OF
            THE PRODUCT or service. YOU HEREBY RELEASE Performlive FROM ANY
            CLAIMS RELATED TO PRODUCTS and services PROVIDED THROUGH OUR
            SERVICES, INCLUDING FOR DEFECTIVE ITEMS, MISREPRESENTATIONS BY
            VENDORS, OR ITEMS THAT CAUSED PHYSICAL INJURY (PRODUCT LIABILITY
            CLAIMS).
          </p>
          <p className="font-bold">
            IN CONNECTION WITH ANY WARRANTY, CONTRACT, OR COMMON LAW TORT
            CLAIMS: (I) WE SHALL NOT BE LIABLE FOR ANY INCIDENTAL OR
            CONSEQUENTIAL DAMAGES, LOST PROFITS, OR DAMAGES RESULTING FROM LOST
            DATA OR BUSINESS INTERRUPTION RESULTING FROM THE USE OR INABILITY TO
            ACCESS AND USE THE SERVICES, THE vendor’s PRODUCTS and services, OR
            THE CONTENT, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
            DAMAGES; AND (II) ANY DIRECT DAMAGES, NOT ATTRIBUTABLE TO PERSONAL
            INJURIES, THAT YOU MAY SUFFER AS A RESULT OF YOUR USE OF THE
            SERVICES OR THE CONTENT SHALL BE LIMITED TO ONE HUNDRED UNITED
            STATES DOLLARS (US $100). Performlive SHALL NOT BE LIABLE FOR DIRECT
            DAMAGES THAT YOU MAY SUFFER AS A RESULT OF YOUR OR ANY THIRD PARTY’S
            PURCHASE OR USE OF ANY PRODUCTS or services.
          </p>
          <p className="font-bold">
            SOME JURISDICTIONS, INCLUDING THE STATE OF NEW JERSEY, DO NOT ALLOW
            THE EXCLUSION OF CERTAIN WARRANTIES OR LIMITATION OF CERTAIN
            LIABILITIES. THEREFORE, SOME OF THE ABOVE LIMITATIONS IN THIS
            SECTION MAY NOT APPLY TO YOU.
          </p>
          <p className="font-bold">
            NOTHING IN THIS AGREEMENT SHALL AFFECT ANY NON-WAIVABLE STATUTORY
            RIGHTS THAT APPLY TO YOU.
          </p>
        </div>

        <div className="privacy-info">
          <h3>INDEMNIFICATION.</h3>
          <p>
            Vendors shall indemnify, defend, and hold harmless Performlive, its
            affiliates, and its and their respective officers, managers,
            partners, employees, and agents from and against any and all losses,
            civil penalties, liabilities, damages, judgments, costs, and
            expenses, including reasonable attorney’s fees and court costs,
            incurred in connection with any proceeding, claim, or action arising
            out of or related to (i) any alleged defect in or injury from
            Vendor’s products or services or any other products liability claim;
            (ii) alleged failure of Vendor or Vendor’s products or services to
            comply with this Agreement or any laws, regulations, warranties,
            guarantees, or representations of Vendor; and (iii) the sale and
            delivery or provision of Vendor’s products or services
          </p>
          <p>
            Buyers indemnify shall indemnify, defend, and hold harmless
            Performlive, its affiliates, and its and their respective officers,
            managers, partners, employees, and agents from and against any and
            all losses, civil penalties, liabilities, damages, judgments, costs,
            and expenses, including reasonable attorney’s fees and court costs,
            incurred in connection with any proceeding, claim, or action arising
            out of or related to any claim by Vendor’s against Performlive.
          </p>
        </div>

        <div className="privacy-info">
          <h3>COMPLIANCE WITH APPLICABLE LAWS.</h3>
          <p>
            The Services are based in the United States. We make no claims
            concerning whether the Services are accessible, or whether Content
            may be downloaded, viewed, or be appropriate for use, or Purchase
            may be made, outside of the United States. Whether inside or outside
            of the United States, you are solely responsible for ensuring
            compliance with the laws of your specific jurisdiction.
          </p>
        </div>

        <div className="privacy-info">
          <h3>CONTROLLING LAW.</h3>
          <p>
            This Agreement and any action related thereto will be governed by
            the laws of the State of New York without regard to its conflict of
            laws provisions. Any dispute that arises between you and us that may
            not be subject to arbitration and must be submitted to the exclusive
            jurisdiction of the state and federal courts in New York, New York.
          </p>
        </div>

        <div className="privacy-info">
          <h3>BINDING ARBITRATION.</h3>
          <p>
            <ul className="subSection">
              <li>
                <span className="text-underline">
                  Mandatory Arbitration of Disputes
                </span>
                . We each agree that any dispute, claim or controversy arising
                out of or relating to this EULA or the breach, termination,
                enforcement, interpretation or validity thereof or the use of
                the Services or Content (collectively, “Disputes”) will be
                resolved solely by binding, individual arbitration and not in a
                class, representative or consolidated action or proceeding. You
                and Performlive agree that the U.S. Federal Arbitration Act (or
                equivalent laws in the jurisdiction in which the Performlive
                entity that you have contracted with is incorporated) governs
                the interpretation and enforcement of this Agreement and that
                you and Performlive are each waiving the right to a trial by
                jury or to participate in a class action. This arbitration
                provision shall survive termination of this Agreement.
              </li>
              <li>
                <span className="text-underline">Exceptions and Opt-out</span>.
                As limited exceptions to the above:
                <ul className="subSection">
                  <li>
                    you may seek to resolve a Dispute in small claims court if
                    it qualifies; and
                  </li>
                  <li>
                    {' '}
                    ◦ we each retain the right to seek injunctive or other
                    equitable relief from a court to prevent (or enjoin) the
                    infringement or misappropriation of our respective
                    intellectual property rights. In addition, you will retain
                    the right to opt out of arbitration entirely and litigate
                    any Dispute if you provide us with written notice of your
                    desire to do so by regular mail sent to us at the 330
                    Washington St. # 172, Hoboken, NJ 07030 (the “Notice
                    Address”) within 30 days following the date you first agree
                    to this Agreement.
                  </li>
                </ul>
              </li>
              <li>
                <span className="text-underline">
                  Initial Dispute Resolution and Notification
                </span>
                . You agree that before initiating any Dispute or arbitration
                proceeding, we will attempt to negotiate an informal resolution
                of any dispute. To begin this process, before initiating any
                arbitration proceeding, you must send a Notice of Dispute
                (“Notice”) by certified mail to us at Notice Address. In the
                Notice, you must describe the nature and basis of the Dispute
                and the relief you are seeking. If we are unable to resolve the
                Dispute within 45 days after Performlive’s receipt of the
                Notice, then you or Performlive may initiate arbitration
                proceedings as set out below.
              </li>
              <li>
                <span className="text-underline">
                  Conducting Arbitration and Arbitration Rules
                </span>
                . Any arbitration will be conducted by JAMS pursuant to its
                Streamlined Arbitration Rules and Procedures (the “JAMS Rules”)
                then in effect, except as modified by this Agreement. The JAMS
                Rules are available at www.jamsadr.com or by calling
                1-800-352-5267. A party who wishes to start arbitration must
                submit a written Demand for Arbitration to JAMS and give notice
                to the other party as specified in the JAMS Rules. JAMS provides
                a form Demand for Arbitration at www.jamsadr.com. JAMS will
                appoint an arbitrator that is either:
                <ul className="subSection">
                  <li>a retired federal or state court judge, or</li>
                  <li>
                    an attorney who has been licensed to practice law in the
                    state of New York for at least 10 years. The arbitration
                    will be conducted by an in-person hearing, unless we both
                    agree otherwise.
                  </li>
                </ul>
                If JAMS fails or declines to conduct the arbitration for any
                reason, we will mutually select a different arbitration
                administrator. If we cannot agree, a court will appoint a
                different arbitration administrator. Any arbitration hearings
                will take place in the county (or other municipality) where you
                live, unless we both agree to a different location. The parties
                agree that the arbitrator shall have exclusive authority to
                decide all issues relating to the interpretation, applicability,
                enforceability and scope of this arbitration agreement. During
                the arbitration, both you and Performlive may take one
                deposition of the opposing party, limited to 4 hours. If we
                cannot agree on a time and location for a deposition, the
                arbitrator will resolve any scheduling disputes.
              </li>
              <li>
                Arbitration Costs. Payment of all filing, administration and
                arbitrator fees will be governed by the JAMS Rules. If you
                assert a claim against Performlive, you will be responsible for
                paying a $250 consumer filing fee. Performlive will pay for all
                other filing, administration and arbitrator fees and expenses.
                If your Dispute is for less than U.S. $10,000 (including
                attorneys’ fees and costs) and the arbitrator, upon final
                disposition of the case, finds your Dispute was not frivolous,
                Performlive will reimburse your initial filing fee. If we
                prevail in arbitration, we will pay all of our attorneys’ fees
                and costs and won’t seek to recover them from you. If you
                prevail in arbitration you will be entitled to an award of
                attorneys’ fees and expenses to the extent provided under
                applicable law.
              </li>
            </ul>
          </p>
        </div>

        <div className="privacy-info">
          <h3>Class Action Waiver.</h3>
          <p>
            <span className="font-bold">
              YOU AND PERFORMLIVE AGREE THAT EACH OF US MAY BRING CLAIMS AGAINST
              THE OTHER ONLY IN AN INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF
              OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE
              PROCEEDING
            </span>
            . Further, if the parties’ dispute is resolved through arbitration,
            neither JAMS nor the arbitrator may not consolidate another person’s
            claims with your claims or otherwise preside over any form of a
            representative or class proceeding for any purpose.{' '}
          </p>
        </div>

        <div className="privacy-info">
          <h3>EQUITABLE RELIEF.</h3>
          <p>
            You acknowledge and agree that in the event of a breach or
            threatened violation of our intellectual property rights and
            confidential and proprietary information by you, we will suffer
            irreparable harm and will therefore be entitled to injunctive relief
            to enforce this Agreement without the obligation to show actual
            damages or post a bond. We may, without waiving any other remedies
            under this Agreement, seek from any court having jurisdiction any
            interim, equitable, provisional, or injunctive relief that is
            necessary to protect our rights and property pending the outcome of
            the arbitration referenced above.
          </p>
        </div>

        <div className="privacy-info">
          <h3>DISPUTES BETWEEN AND AMONG USERS.</h3>
          <p>
            If there is a dispute between or among Users of the Services, you
            agree to initiate the dispute with Performlive directly. Performlive
            will take steps to mediate the User dispute in its sole, reasonable
            discretion. Performlive will keep each party updated as to the
            status of disputes by messaging the parties through the accounts on
            the Service. Notwithstanding Performlive’s good faith efforts, some
            disputes may not be resolved in a manner that satisfies all parties.
            Performlive’s decision with respect to all disputes is final. In the
            event that you have a dispute with one or more other Users, you
            release Performlive, its officers, employees, agents, and successors
            from claims, demands, and damages of every kind or nature, known or
            unknown, suspected or unsuspected, disclosed or undisclosed, arising
            out of or in any way related to such disputes and/or our Services.
          </p>
        </div>

        <div className="privacy-info">
          <h3>EXTERNAL SITES.</h3>
          <p>
            The Services may contain links to third-party websites (“External
            Sites”). These links are provided solely as a convenience to you and
            not as an endorsement by us of the content on such External Sites.
            The content of such External Sites is developed and provided by
            others. You should contact the site administrator or webmaster for
            those External Sites if you have any concerns regarding such links
            or any content located on such External Sites. We are not
            responsible for the content of any linked External Sites and do not
            make any representations regarding the content or accuracy of
            materials on such External Sites. You should take precautions when
            downloading files from all websites to protect your computer from
            viruses and other destructive programs. If you decide to access
            linked External Sites, you do so at your own risk.
          </p>
        </div>

        <div className="privacy-info">
          <h3>DOWNLOADING THE SERVICES APPLICATION.</h3>
          <p>
            We make the Services available through the Apple App Store or Google
            Play (“App Provider”). The following terms apply when you download
            the Services from Apple’s App Store. This Agreement are in addition
            to all other terms contained in the Agreement.
          </p>
          <p>
            You acknowledge and agree that (i) the Agreement is concluded
            between you and Performlive only, and not Apple; and (ii)
            Performlive, not Apple, is solely responsible for the Services and
            content thereof. Your use of the Services must comply with the App
            Provider’s end user license agreement.
          </p>
          <p>
            You acknowledge that App Provider has no obligation whatsoever to
            furnish any maintenance and support services with respect to the
            Services.
          </p>
          <p>
            In the event of any failure of any of the Services to conform to any
            applicable warranty, you may notify App Provider, and App Provider
            will refund the purchase price, if any, for the Services to you and,
            to the maximum extent permitted by applicable law, App Provider will
            have no other warranty obligation whatsoever with respect to the
            App. As between Performlive and App Provider, any other claims,
            losses, liabilities, damages, costs, or expenses attributable to any
            failure to conform to any warranty will be the sole responsibility
            of Performlive.
          </p>
          <p>
            You acknowledge that, in the event of any third-party claim that the
            Services or your possession and use of the Services infringes that
            third party’s intellectual property rights, as between Performlive
            and App Provider, Performlive, not App Provider, will be solely
            responsible for the investigation, defense, settlement, and
            discharge of any such intellectual property infringement claim to
            the extent required by the Agreement.
          </p>
          <p>
            You acknowledge and agree that App Provider, and App Provider’s
            subsidiaries, are third-party beneficiaries of the Agreement as
            related to your license of the App, and that, upon your acceptance
            of the terms and conditions of the Agreement, App Provider will have
            the right (and will be deemed to have accepted the right) to enforce
            the Agreement as related to your license of the Services against you
            as a third-party beneficiary thereof.
          </p>
        </div>

        <div className="privacy-info">
          <h3>GENERAL.</h3>
          <p>
            No failure or delay by Performlive in exercising any right or remedy
            under the Agreement will operate, or be deemed to operate, as a
            waiver of any such right or remedy. If any provision of the
            Agreement is found invalid or unenforceable by a court of competent
            jurisdiction, that provision will be amended and the remainder of
            the Agreement will remain in full force and effect. The Agreement
            constitutes the final and complete agreement between you and
            Performlive regarding the subject matter hereof, and supersede any
            prior or contemporaneous communications, representations, or
            agreements between us, whether oral or written, including, without
            limitation, any confidentiality or non-disclosure agreements.
            Headings are for convenience only and shall not be used to limit or
            interpret the meaning of any of the provisions of the Agreement.
            Terms which by their nature are intended to survive indefinitely
            shall survive and shall apply to you even if you have canceled your
            account or stopped using the Services, including, without
            limitation, the limitations of liability, indemnity, and dispute
            resolution provisions.
          </p>
        </div>

        <div className="privacy-info">
          <h3>HOW TO CONTACT US.</h3>
          <p>
            If you have questions about the Agreement or our Services, please
            contact us via email at{' '}
            <a href="mailto:hello@Performlive.com">hello@Performlive.com</a>
          </p>
        </div>

        <div className="privacy-bottom">
          <img src={IMG.PRIVACY_LOGO} />
          <p>Ⓒ 2021 PerformLive. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

UserAgreement.propTypes = {};

export default UserAgreement;
