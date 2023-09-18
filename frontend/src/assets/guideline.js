const GuidelineData = (memoTenant, tenantEmail) => {
  return `
  ## <p className="text-center underline">**${memoTenant} Community Guidelines**</p>
  
  ${memoTenant} is an online community on a mission to celebrate every child’s individuality, to teach you everything you need to be anything you want. We have a library of creative projects and life-skills videos with challenges and assessments, combined with an amazing community of kids! 
  
  We need your help to make ${memoTenant} a place where all kids, ages 6 to 12 feel safe, welcomed, and inspired to be awesome! 

  When you sign up for ${memoTenant}, you agree to honor the following Guidelines to be responsible digital citizens:
  
  1. Be a Creative Genius: Focus on trying something new and building your skills by creating. There is no wrong method so go all out!
      <p>a. <span className="font-bold text-white">Share what you are making.</span> You are encouraged to share your creativity. Your uploads should be relevant to what you are learning and making based on the Course. Pictures or videos unrelated to ${memoTenant}’s challenges may be removed to keep the community focused on creative awesomeness.</p>
      <p>b. <span className="font-bold text-white">Together we grow.</span> Focus on your projects. It is great to ask for feedback from the other Novaliers or directly message the teachers for valuable suggestions.</p>
  2. Be a Proud Original: Share your stuff with others and talk about it. You could be inspiring someone else!
      <p>a. <span className="font-bold text-white">Be yourself.</span> Your uploads should be all about you, your learning journey, and the unique things you are learning and creating. Tell your story!</p>
      <p>b. <span className="font-bold text-white">No copying.</span> ${memoTenant} is a space for you to show off the things you’ve made yourself. Don’t post or take credits for images you found online. Always ask for permission before borrowing or referencing something that someone else made, and be sure to give them credit in the comments.</p>
      <p>c. <span className="font-bold text-white">Impersonating.</span> Pretending to be someone else or disguising one’s identity as your friend or a celebrity (even as a joke) is not allowed and will result in your account deletion.</p>
      <p>d. <span className="font-bold text-white">Featured.</span> Your work might be selected to be featured on social media so make sure you upload the best shot!</p>
  3. Be safe: Keep your personal information private and never ask other Novaliers for theirs.
      <p>a. <span className="font-bold text-white">Keep personal stuff secret.</span> Never post your full name, home address, phone number, email address, where you go to school, links to your other social media accounts, or any identifying info online. Also, remember that your parents have access to everything you share and comment on ${memoTenant}!</p>
      <p>b. <span className="font-bold text-white">Respect others’ privacy.</span> Everybody has unique preferences about their online safety. Avoid asking other Novaliers for their personal info and always get someone’s permission before posting their face, name, or any other identifying info online.</p>
      <p>c. <span className="font-bold text-white">Choose a unique nickname.</span> Be sure to choose a nickname that doesn’t disclose any personal info. If you need to change your nickname to protect your privacy, let us know!</p>
      <p>d. <span className="font-bold text-white">Avoid monetary transactions.</span> ${memoTenant} is not a place to buy or sell things. To avoid scams and safety concerns, never ask for or give your info related to money exchanges (like credit card numbers).</p>
      <p>e. <span className="font-bold text-white">When in doubt, report.</span> If someone on ${memoTenant} asks for your personal info, always say NO. If they persist, or if you ever feel unsafe on ${memoTenant}, report the user to Naadia from ${memoTenant} (green button on the bottom right corner) and tell your parents or a trusted adult.</p>
      <p>f. <span className="font-bold text-white">Do not meet.</span> Novaliers are encouraged to share their work via ${memoTenant} and not meet in person anyone without a parent or legal guardian's consent.</p>
      <p>g. <span className="font-bold text-white">One account for one person.</span> Do not share your password or account nickname with others apart from your parents. You are only able to submit one upload for every challenge.</p>
  4. Be friendly: Show kindness to all Novaliers
      <p>a. <span className="font-bold text-white">Embrace others’ differences.</span> We value diversity. ${memoTenant} welcomes kids of all backgrounds, races, ethnicities, religions, abilities, body types, gender identities, sexual orientations, and education types. Unfriendly language, discrimination, or threats based on these or any other identities are never ok. Your account might be banned if there are reports or sightings of being unkind.</p>
      <p>b. <span className="font-bold text-white">Include everyone.</span> We encourage inclusion. ${memoTenant} is a space to meet other kids whose lives are different from your own. Be kind and inclusive when sharing your beliefs or responding to others sharing theirs. Posts/ comments that aim to criticize, convert, or otherwise devalue others’ beliefs or identities are not allowed. Your account might be banned if there are reports or sightings of being unkind.</p>
  5. Be helpful: Share tips and encouragement with other Novaliers (and be patient with them while they learn)
      <p>a. <span className="font-bold text-white">Support each others’ growth.</span> ${memoTenant} is a place where everyone learns and grows. Constructive criticism is allowed and encouraged, but straight-up negativity is not nice and not allowed. When commenting on others’ projects, say something you like about it and offer suggestions!
      <p>b. <span className="font-bold text-white">Help others learn.</span> Whenever possible, include details about how you made something or what inspired you! This makes it easier for other Novaliers to learn from you, think of yourself as a Teacher Assistant. Remember: other Novaliers may be younger, may learn differently or may speak a different language than you. Be polite and patient when helping others, even if they annoy you or ask questions that may seem obvious.</p>
      <p>c. <span className="font-bold text-white">Report a bug.</span> ${memoTenant} is made up of videos, gamified experience and most importantly, all our fellow Novaliers! If you found a glitch or something went wrong with your course or avatar, let Nadia (the green button on the bottom right corner) know or drop us an email at <a href='mailto:${tenantEmail} className='text-white'>${tenantEmail}</a></p>
  6. Be respectful: Share projects and comments that are appropriate for everyone, including younger Novaliers
      <p>a. <span className="font-bold text-white">Keep the language clean.</span> Profanity (AKA “swear” or “bad” words) is not allowed. Videos, audio,  photos, or comments that include profanity will be removed.</p>
      <p>b. <span className="font-bold text-white">Stay age-appropriate.</span> To keep ${memoTenant} suitable for kids of all ages (17 and under), posts that include, refer to, or link to mature content (including written descriptions, images, audio, or video) are not allowed. This includes but is not limited to:</p>
      <ul className="list-disc marker:text-white">
        <li>Use of drugs, alcohol or other age-restricted/illegal substances</li>
        <li>Suggestive or explicit romantic content</li>
        <li>Cyberbullying or making threats</li>
        <li>Sensitive personal topics like self-harm or depression</li>
        <li>Excessive gore, violent imagery, or violent weapons</li>
        <li>Shocking events like natural/manmade disasters or tragedies</li>
        <li>Illegal prodicts, service of content that violates any applicable law</li>
        <li>Political ad or content that promotes political agenda</li>
        <li>Gambling or lottery products or services </li>
      </ul>   
   7. Be a role model: Show good judgment, stay positive and be an awesome digital citizen.  
      <p>a. <span className="font-bold text-white">Keep it positive.</span> ${memoTenant} is a great place to express yourself. However, some types of expression aren’t suitable for all ages and should be avoided on ${memoTenant}. Please don’t put yourself down (e.g., “I hate this”, “I’m no good at this”) or encourage mean or non-constructive criticism from other Novaliers. We encourage positivity like “Let’s do this!”</p>
      <p>b. <span className="font-bold text-white">Take the high road.</span> Don’t respond to negativity with more negativity. If you see something on ${memoTenant} that goes against our community guidelines, report the Novalier or comment so that the ${memoTenant} moderators can handle it. You can reach Nadia at the green button on the bottom right corner or email us at <a href='mailto:${tenantEmail} className='text-white'>${tenantEmail}</a></p>
      <p>c. <span className="font-bold text-white">Have fun.</span> Remember, you are here to learn while having fun. Focus on learning new skills, building your online portfolio and meeting new friends. Aim to grow!</p>
   <hr className=' border-white mb-4' />
   Most violations of the Guidelines are judged on a case-by-case basis, and we do our best to enforce them consistently and fairly. Violations will result in:
    <ul className="list-disc marker:text-white">
        <li><span className="font-bold text-white">Written warnings:</span> Minor violations of the ${memoTenant} Guidelines shall result in a written warning to Novaliers via an email to parents.</li>
        <li><span className="font-bold text-white">Post removal:</span> If a post contains content that’s not in alignment with the ${memoTenant} Guidelines, ${memoTenant} moderators may permanently remove it.</li>
        <li><span className="font-bold text-white">Temporary suspension:</span> Repeated or serious violations may result in account suspensions, which remove all of a Novalier’s posting and commenting privileges. Suspensions are often temporary until the moderator team, the Novalier, and their parents can resolve the issue privately via email or phone.</li>
        <li><span className="font-bold text-white">Banning:</span> ${memoTenant} moderators reserve the right to permanently and immediately ban accounts that put the safety of the community at risk. Banning removes the Novalier’s account completely from the platform.</li>
    </ul>
  We appreciate Novaliers who are active in following the guidelines and who inspire each other to learn, take risks and create. You are the ones building this awesome community!

  Note: This Community Guideline was created on 29 May 2021. This Guideline was revised on 13 June 2022.

  **Questions or Concerns**

  If you have any questions or concerns regarding the Community Guidelines and Digital Citizenship on ${memoTenant}, please send a detailed message to ${memoTenant} via email at [${tenantEmail}](mailto:${tenantEmail}). 

  We will make every effort to resolve your concerns. `;
};

export default GuidelineData;
