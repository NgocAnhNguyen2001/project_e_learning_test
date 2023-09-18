import Link from "next/link";
import React from "react";

import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import LandingFooter from "@/components/Layout/LandingFooter";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { withApollo } from "utils/hooks/withApollo";

const Terms = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  return (
    <AppLayout hostname={hostname} darkLayout noFooter>
      <div className="bg-[#220A4F] relative min-h-screen">
        <div className="h-auto bg-fixed bg-center bg-no-repeat bg-cover bg-landing-top">
          <Section size="2xl" padding="sm">
            <div className="mt-32">
              <article className="mx-auto prose prose-invert lg:prose-xl">
                <h2 className="text-center">
                  <u>{memoTenant.name} Terms and Conditions of Use</u>
                </h2>
                <p>
                  These Terms and Conditions (“<strong>Terms</strong>”) were
                  last updated on April 25, 2022.
                </p>
                <p>
                  {memoTenant.name} is an online community on a mission to
                  celebrate every child’s individuality, to teach you everything
                  you need to be anything you want. We have a library of
                  creative projects and life-skills videos with challenges and
                  assessments, combined with an amazing community of kids. We
                  need your help to make {memoTenant.name} a place where all
                  kids ages 17 or younger feel safe, welcome, and inspired to be
                  awesome!{" "}
                </p>
                <p>
                  These Terms apply to all your activities on the{" "}
                  {memoTenant.name} platform (including website and mobile
                  application)(the “{memoTenant.name} Platform”). We also
                  provide details regarding our processing of personal data of
                  our users in our{" "}
                  <Link href="/privacy">
                    <a className="underline transition duration-150 ease-in-out hover:text-blue-400">
                      Privacy Policy.
                    </a>
                  </Link>
                </p>
                <p>
                  When you sign up for {memoTenant.name}, you agree to the Terms
                  set out herein. If you do not understand or do not wish to be
                  bound by the Terms and/or our Privacy Policy, you should not
                  use the {memoTenant.name} Platform. You hereby certify that
                  (i) you are the parent or legal guardian (the “Parent” or
                  “Guardian”, as applicable) of the student user (the “Student
                  User”) of the {memoTenant.name} Platform, a minor who is under
                  18 years of age, or (ii) you are a teacher and that you are at
                  least 18 years of age (the “Teacher”) to create a teacher’s
                  account on the {memoTenant.name} Platform and you agree to the
                  Terms herein as they are applicable to you in addition to the
                  Teacher Terms.
                </p>
                <ol>
                  <li>
                    <strong>Accounts</strong>
                    <p>
                      You need any account to use the {memoTenant.name}{" "}
                      Platform. Keep your password somewhere safe because you
                      are responsible for all activities associated with your
                      account. If you suspect someone else is using your
                      account, let us know by contacting{" "}
                      <a
                        className="underline transition duration-150 ease-in-out hover:text-blue-400"
                        href={`mailto:${memoTenant.email}`}
                      >
                        {memoTenant.email}
                      </a>
                      . When setting up an account, you must provide and
                      continue to provide accurate and complete information,
                      including a first name, last name, valid email address.
                      Your {memoTenant.name} portfolio should be all about you
                      and the unique things you are making and learning. Sharing
                      of accounts or transferring of accounts between multiple
                      users is not allowed. Pretending to be someone else or
                      disguising one’s identity is not allowed and will result
                      in a ban. If you contact us to request access to an
                      account, we will not grant you such access unless you can
                      provide us with the information that we need to prove you
                      are the owner of such account.
                    </p>
                    <p>
                      As the Parent or Guardian of a Student User, you shall
                      open an account and hereby undertake all responsibility to
                      help the Student User access content that is appropriate
                      for the Student User. If you are below the age of 18, you
                      may not create a {memoTenant.name} account but may have a
                      parent or guardian open an account and help access
                      appropriate content. If we discover that you have created
                      an account that violates these rules, we will terminate
                      your account.
                    </p>
                    <p>
                      You can terminate your account at any time by following
                      the steps <u>here</u>. A Teacher’s account will be deleted
                      upon his or her termination as a teacher on the{" "}
                      {memoTenant.name} Platform, further details of which are
                      available on <u>Teacher Terms</u>. Check our{" "}
                      <Link href="/privacy">
                        <a className="underline transition duration-150 ease-in-out hover:text-blue-400">
                          Privacy Policy
                        </a>
                      </Link>{" "}
                      to see what happens when you terminate your account.
                    </p>
                  </li>
                  <li>
                    <strong>Content Enrollment and Access</strong>
                    <p>
                      When you sign up for an account on the {memoTenant.name}{" "}
                      Platform, you are authorized to use the {memoTenant.name}{" "}
                      Platform but only for personal education and
                      non-commercial purposes. In particular, you cannot use the{" "}
                      {memoTenant.name} Platform to generate revenue or
                      distribute or redistribute any portion and/or contents
                      available on the {memoTenant.name} Platform.
                    </p>
                    <p>
                      The {memoTenant.name} Platform contains material that is
                      protected by copyright, trademark or other intellectual
                      property rights and the {memoTenant.name} Platform itself,
                      is protected as a collective work under the copyright law
                      and other laws of Hong Kong and other legal jurisdictions.
                      You may not download, modify, publish, transmit, create
                      derivative works from, or in any way exploit any component
                      of the {memoTenant.name} Platform.
                    </p>
                    <p>
                      Under our <u>Teacher Terms</u>, [Note: {memoTenant.name}{" "}
                      to hyperlink to Teacher Terms.]when teachers or
                      instructors publish content on the {memoTenant.name}{" "}
                      Platform, they grant {memoTenant.name} a license to offer
                      a license to the contents to you and/or any Student User.
                      Such content viewed by any Student User is solely
                      licensed, not sold to you and/or the Student User. Neither
                      you nor the Student User has any right to sell the content
                      in any manner (including by sharing account information
                      with a third party or illegally downloading the content
                      and sharing it on torrent sites or otherwise). Teachers
                      may not grant license to their content to you and/or any
                      Student User directly and any such direct license shall be
                      null and void and in violation of these Terms.
                    </p>
                    <p>
                      {memoTenant.name} reserves the right to revoke any license
                      to access, use or view any content at any point in time in
                      the event where {memoTenant.name} decides or are obligated
                      to disable access by you and/or the Student user.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Payments</strong> (not applicable for Teachers)
                    </p>
                    <p>
                      You agree to pay the fees to access (and for the Student
                      User to access) the {memoTenant.name} Platform and you
                      authorize us to charge your credit card or process other
                      means of payment for those fees as arranged with{" "}
                      {memoTenant.name} and the relevant parties. To facilitate
                      the payment process, as applicable, {memoTenant.name}{" "}
                      works with payment service providers to offer you the most
                      convenient and secure payment methods. You may from time
                      to time change or update the payment method. You hereby
                      agree that the pricing information provided by the{" "}
                      {memoTenant.name} Platform. The pricing information may be
                      updated from time to time. {memoTenant.name} has the sole
                      discretion to amend or revise the pricing information from
                      time to time without any prior notice to or consent by you
                      and/or any Student User.
                    </p>
                    <p>
                      By making any payment through the {memoTenant.name}{" "}
                      Platform, you are deemed to have accepted the terms and
                      conditions of the relevant specified payment gateway,
                      which may or may not charge administrative fees and/or
                      other fees. {memoTenant.name} is not responsible for such
                      fees and you shall solely be responsible for the said
                      fees. {memoTenant.name} is not liable for any loss,
                      damages, costs and expenses suffered by you and/or the
                      Student User arising out of or in connection with (i) any
                      act, default, omission or negligence of the relevant
                      specified payment gateway, or (ii) the suspension,
                      malfunction and/or closure of the relevant specified
                      payment gateway.
                    </p>
                    <p>All fees paid are non-refundable.</p>
                  </li>
                  <li>
                    <strong>Content and Behavior Rules</strong>
                    <p>
                      You can only use the {memoTenant.name} Platform for lawful
                      purposes. You are responsible for all the content that you
                      post on the {memoTenant.name} Platform. All the content
                      provided by you, your behavior and any of your activities
                      on the {memoTenant.name} Platform shall be in line with
                      the{" "}
                      <Link href="/community-guidelines">
                        <a className="underline transition duration-150 ease-in-out hover:text-blue-400">
                          {memoTenant.name} Community Guidelines
                        </a>
                      </Link>{" "}
                      and compliant with the law as well as recognizing the
                      intellectual property rights of others. {memoTenant.name}{" "}
                      may, in its sole discretion, determine to ban, restrict
                      and/or terminate your account, at any time with or without
                      notice, for any or no reason, including but not limited to
                      the violation of these Terms, the {memoTenant.name}{" "}
                      Community Guidelines and/or applicable laws and
                      regulations. Upon any such termination, we may delete your
                      account and content and we may prevent you from further
                      access to the {memoTenant.name} Platform. You agree that{" "}
                      {memoTenant.name} shall have no liability to you, the
                      Student User or any third party for termination of your
                      account, removal of any content related to such account or
                      blocking of access by you and/or the Student user to the
                      {memoTenant.name} Platform.
                    </p>
                  </li>
                  <li>
                    <strong>
                      {memoTenant.name}’s Rights to Content You Post
                    </strong>
                    <p>
                      You retain ownership of content you post to the{" "}
                      {memoTenant.name} Platform. {memoTenant.name} is allowed
                      to share your content to anyone through any media,
                      including promoting it via other websites. The content you
                      post, whether as the Parent or Guardian, Student User or
                      Teacher, remains yours.
                    </p>
                    <p>
                      By submitting or posting content on the {memoTenant.name}
                      Platform, you grant {memoTenant.name} a worldwide,
                      irrevocable, non-exclusive, royalty-free license (with the
                      right to sub-license) to use, copy, reproduce, store,
                      process, adapt, modify, publish, transmit, display,
                      translate and distribute your content (including your name
                      and image (including any Student User)) in any and all
                      media distribution methods (existing now or later
                      developed). You also grant {memoTenant.name} the right to
                      bring an action for infringement of the rights licensed
                      herein. You, and you on behalf of any Student User, as
                      applicable, also waive any moral rights in your content,
                      rights of privacy, publicity or other rights of a similar
                      nature applicable to all these uses, to the extent
                      permissible under applicable law. You represent and
                      warrant that you, and you on behalf of the Student User,
                      as applicable, have all the rights, power and authority
                      necessary to authorize {memoTenant.name} to use any
                      content that you submit or post on the {memoTenant.name}{" "}
                      Platform. You, and you on behalf of the Student User, as
                      applicable, agree to all such uses of your content with no
                      compensation paid to you.
                    </p>
                  </li>
                  <li>
                    <strong>Using {memoTenant.name} at Your Own Risk</strong>
                    <p>
                      {memoTenant.name} does not review or edit the content
                      posted by you, Student Users or Teachers.{" "}
                      {memoTenant.name} does not exercise any editorial control
                      over the content that is available on the platform and as
                      such, does not guarantee in any manner the reliability,
                      validity, accuracy or truthfulness of the content. If you
                      access content on the {memoTenant.name} Platform, you rely
                      on any information provided by the Teacher or other
                      participants at your own risk.
                    </p>
                    <p>
                      By using the {memoTenant.name} Platform, you may be
                      exposed to content that you consider offensive, indecent
                      or objectionable. {memoTenant.name} has no responsibility
                      to keep such content from you (including any Student
                      users) and no liability for your access to the{" "}
                      {memoTenant.name} Platform and/or any content therefrom,
                      to the extent permissible under applicable law and
                      regulations. Such is applicable also to any content
                      relating to physical and mental health and wellness.
                    </p>
                    <p>
                      When you interact directly with other participants such as
                      a Student User or a Teacher, you must be careful about the
                      types of personal information that you share. While we may
                      restrict access to student information as part of{" "}
                      {memoTenant.name}’s internal administration policies, we
                      do not control what Student Users and Teachers do with the
                      information they obtain from other users directly while
                      using the {memoTenant.name} Platform. You should not share
                      your email or other personal information about you for
                      your own safety. We are not liable for disputes, claims,
                      losses, injuries or damage of any kind that might arise
                      out of or relate to the conduct of you, Student Users
                      and/or Teachers.
                    </p>
                  </li>
                  <li>
                    <strong>{memoTenant.name}’s Rights</strong>
                    <p>
                      {memoTenant.name} owns the {memoTenant.name} Platform
                      including the website, present or future applications
                      (including mobile applications) and things like{" "}
                      {memoTenant.name}’s logos, code and content created by our
                      employees. You cannot tamper with those or use them
                      without {memoTenant.name}’s express and written
                      authorization and consent.
                    </p>
                    <p>
                      All rights, titles and interest in and to the{" "}
                      {memoTenant.name} Platform, including our website, our
                      existing or future applications, databases and the content
                      our employees and/or our contractors created for the{" "}
                      {memoTenant.name} Platform are and will remain the
                      exclusive property of {memoTenant.name} and its licensors,
                      unless otherwise specified or agreed to in writing between{" "}
                      {memoTenant.name} and the relevant parties. The{" "}
                      {memoTenant.name} Platform is protected by copyright,
                      trademark and other laws of Hong Kong and other foreign
                      jurisdictions. You are not permitted to use{" "}
                      {memoTenant.name}’s name or any of {memoTenant.name}’s
                      trademarks, logos, domain names and other distinctive
                      brand features. Any feedback, comments or suggestions you
                      may provide regarding {memoTenant.name} or the{" "}
                      {memoTenant.name} Platform is entirely voluntary and{" "}
                      {memoTenant.name} is free to use such feedback, comments
                      or suggestions as we see fit and without any obligation to
                      you.
                    </p>
                  </li>
                  <li>
                    <strong>Subscription Terms</strong>
                    <p>
                      You will need to sign up with an account and pay the
                      corresponding fee before you and the Student User shall
                      have access to the {memoTenant.name} Platform. Please see
                      [our Subscription Packages]. To sign up for your{" "}
                      {memoTenant.name} account, you and the Student User will
                      be required to provide certain personal information.
                      Please see our{" "}
                      <Link href="/privacy">
                        <a className="underline transition duration-150 ease-in-out hover:text-blue-400">
                          Privacy Policy
                        </a>
                      </Link>{" "}
                      for further details.
                    </p>
                  </li>
                  <li>
                    <strong>Privacy Policy</strong>
                    <p>
                      I hereby acknowledge and agree to be bound by the terms of{" "}
                      {memoTenant.name}’s{" "}
                      <Link href="/privacy">
                        <a className="underline transition duration-150 ease-in-out hover:text-blue-400">
                          Privacy Policy
                        </a>
                      </Link>{" "}
                      and shall not disclose or make use of any personal data of
                      any other user without the prior written consent of such
                      user.
                    </p>
                  </li>
                  <li>
                    <strong>Binding Agreement</strong>
                    <p>
                      You agree that by registering, accessing or using the{" "}
                      {memoTenant.name} Platform, you are agreeing to enter into
                      a legally binding contract with {memoTenant.name}. If you
                      do not agree to these Terms, do not register, access or
                      otherwise use the {memoTenant.name} Platform.
                    </p>
                    <p>
                      If you are a Teacher accepting these Terms and using the{" "}
                      {memoTenant.name} Platform on behalf of any company,
                      organization, government or other legal entity, you
                      represent and warrant that you are authorized to do so.
                    </p>
                    <p>
                      In the event of any inconsistencies or discrepancies
                      between the English version and any other translated
                      versions of these Terms, the English version shall
                      prevail.
                    </p>
                    <p>
                      These Terms (including any agreements and policies linked
                      from these Terms) constitute the entire agreement between
                      you and {memoTenant.name}. If, at any time, any provision
                      of these Terms is or becomes illegal, invalid or
                      unenforceable in any respect under any law of any
                      jurisdiction, neither the legality, validity or
                      enforceability of the remaining provisions nor the
                      legality, validity or enforceability of such provision
                      under the law of any other jurisdiction will in any way be
                      affected or impaired.
                    </p>
                    <p>
                      Even if {memoTenant.name} delays or fails to take any
                      action to exercise its rights under these Terms, such
                      delay or inaction shall not be deemed a waiver of any
                      rights {memoTenant.name} is entitled to under these Terms.
                      Should {memoTenant.name} decide to waiver any rights in a
                      particular instance, such shall not be deemed a waiver of
                      their rights in general or in the future.
                    </p>
                  </li>
                  <li>
                    <strong>Disclaimers</strong>
                    <p>
                      We make no representations or warranties about the
                      suitability, reliability, availability, timeliness,
                      security, lack of errors or accuracy of the content
                      available on the {memoTenant.name} Platform and of the{" "}
                      {memoTenant.name}
                      Platform as a whole, and expressly disclaim any warranties
                      or conditions (express or implied) including warranties of
                      merchantability, fitness for a particular purpose, title
                      and non-infringement. We make no warranty that you will
                      obtain specific results from the use of the{" "}
                      {memoTenant.name}
                      Platform. Your use of the {memoTenant.name} Platform
                      (including its content) is entirely at your own risk.
                    </p>
                    <p>
                      We are not responsible for delay or failure of our
                      performance relating to the {memoTenant.name} Platform
                      caused by events beyond our reasonable control, including
                      but not limited to acts of God, pandemic, war, terrorism,
                      insurrection, revolution, hostility or sabotage, natural
                      disasters, electrical, internet or telecommunication
                      outages and/or government or regulatory restrictions.
                    </p>
                  </li>
                  <li>
                    <strong>Limitation of Liability and Indemnification</strong>
                    <p className="font-bold uppercase">
                      IN NO EVENT WILL WE, OUR PARENTS OR AFFILIATES, OR ANY OF
                      OUR RESPECTIVE INVESTORS, DIRECTORS, OFFICERS, EMPLOYEES,
                      AGENTS AND SUPPLIERS (COLLECTIVELY, THE “INDEMNIFIED
                      PARTIES”), BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY
                      DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL,
                      CONSEQUENTIAL OR OTHER DAMAGES, INCLUDING LOSS OF PROFITS,
                      ARISING OUT OF OR IN ANY WAY RELATED TO THE USE OF THE
                      SITE (INCLUDING ANY INFORMATION, PRODUCTS OR SERVICES
                      ADVERTISED IN, OBTAINED ON OR PROVIDED THROUGH THE{" "}
                      {memoTenant.name} PLATFORM OR CONTENT CREATED ON OR
                      THROUGH THE {memoTenant.name} PLATFORM).
                    </p>
                    <p className="font-bold uppercase">
                      THE {memoTenant.name} PLATFORM IS PROVIDED ON AN “AS IS”
                      BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                      IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF
                      TITLE OR IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS
                      FOR A PARTICULAR PURPOSE.
                    </p>
                    <p className="font-bold uppercase">
                      THIS DISCLAIMER OF LIABILITY APPLIES TO ANY DAMAGES OR
                      INJURY CAUSED BY ANY FAILURE OF PERFORMANCE, ERROR,
                      OMISSION, INTERRUPTION, DELETION, DEFECT, DELAY IN
                      OPERATION OR TRANSMISSION, COMPUTER VIRUS, COMMUNICATION
                      LINE FAILURE, THEFT OR DESTRUCTION OR UNAUTHORIZED ACCESS
                      TO, ALTERATION OF, OR USE OF THE SERVICES, WHETHER FOR
                      BREACH OF CONTRACT, TORTIOUS BEHAVIOR, NEGLIGENCE, GROSS
                      NEGLIGENCE, OR UNDER ANY OTHER CAUSE OF ACTION, EVEN IF
                      THE CLAIM ALLEGES THAT THE INDEMNIFIED PARTIES’ CONDUCT
                      WAS WILLFUL.
                    </p>
                  </li>
                  <li>
                    <strong>Governing Law</strong>
                    <p>These Terms are governed by Hong Kong law.</p>
                  </li>
                  <li>
                    <strong>Dispute and Notices</strong>
                    <p>
                      The courts of Hong Kong have exclusive jurisdiction to
                      resolve any dispute arising out of or in connection with
                      these Terms.
                    </p>
                    <p>
                      Unless otherwise specified in these Terms, all notices
                      must be in writing and addressed to the other party’s
                      email address. All notices to {memoTenant.name} shall be
                      sent to us at{" "}
                      <a
                        href={`mailto:${memoTenant.email}`}
                        className="underline transition duration-150 ease-in-out hover:text-blue-400"
                      >
                        {memoTenant.email}
                      </a>
                      .
                    </p>
                  </li>
                  <li>
                    <strong>Updating these Terms</strong>
                    <p>
                      From time to time, we may update these Terms to clarify
                      our practices or to reflect new or different practices
                      (such as when we add new features), and {memoTenant.name}{" "}
                      reserves the right in its sole discretion to modify and/or
                      make changes to these Terms at any time. Your continued
                      use of our Services after changes become effective shall
                      mean that you accept those changes. Any revised Terms
                      shall supersede all previous Terms.
                    </p>
                  </li>
                  <li>
                    <strong>How to Contact Us</strong>
                    <p>
                      If you have any questions or concerns regarding these
                      Terms, the Community Guidelines and/or participating on
                      the {memoTenant.name} Platform, please send a detailed
                      message to {memoTenant.name} via email at{" "}
                      <a
                        href={`mailto:${memoTenant.email}`}
                        className="underline transition duration-150 ease-in-out hover:text-blue-400"
                      >
                        {memoTenant.email}
                      </a>
                      .
                    </p>
                    <p>We will make every effort to resolve your concerns.</p>
                  </li>
                </ol>
              </article>
            </div>
          </Section>
        </div>
        <LandingFooter memoTenant={memoTenant} />
      </div>
    </AppLayout>
  );
};

export default withApollo(Terms);

export const getServerSideProps = extractHostname;
