## FAQ Questions

<br>

**Do I have to pay for any part of BeakSpeak?** <br>
Nope, everything is free. Although new features will be added, we do not have
plans to monetize these features.
<br>

**How anonymous is BeakSpeak?** <br>
Obviously you've noticed we require you to sign in. This is for two reason: 1)
to ensure you are part of the Rice community and 2) to ensure liability under
legal circumstances. These circumstances include, but is not limited to, bomb
threats, child pornography, essentially any criminal acitivty. These
circumstances will (hopefully) be extremely rare, and when they do happen there
is a strict pipeline for who has permission to uncover netids
<br>

**Are you saying you store my netid?** <br>
Not exactly; somewhere along the authentication pipeline, we hash your netid,
specifically we take the SHA256 of your netid after a salt
(a long string consisting of random characters) is appended to your netid. The
salt is only known to the team lead at the time and the executives of Rice-Apps.
This way, your netid is not only protected from random attackers but also from
the developers!
<br>

**If I break the law on BeakSpeak, how will you know it's me?** <br>
As explained above, only a select few admins know the database salt. These
admins will perform the procedure explained above on all netids in the system
and seize the netid that results in a match.
<br>

**How secure is BeakSpeak?** <br>
Every transaction between the app and the database is done over HTTPS. This
means every transaction is encrypted. Furthermore, your authentication is backed
by the official server that Rice uses, which is CAS.
<br>

Every so often, the salt and secret (you can think of these as database
passwords) are changed. This prevents previous members who know the code from
getting undue access to the database. 
<br>

**How do you moderate posts?** <br>
As you can see, every post and comment has a report button. After you send a
report, we have two admins who review reports every two-three days. We remove
posts that violate the user policy. 

