const assert = require("assert");
const {
  getVoteStatus,
  setVote,
  getVoteYesTotals,
  getVoteNoTotals,
} = require("../lib");

describe("Multiple voters vote to merge Pull Request 1: issue_1", function () {
  it("Should add votes to the votes table, add yes/noTokensAmount to the pullRequest table, set PR status to merge when majority is reached", async function () {
    let michaelVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    const voteYesTotals50000 = await getVoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotals0 = await getVoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const openStatus = await getVoteStatus(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let gabrielVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );

    const magdaVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*side*/ "yes"
    );

    const thomasVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53",
      /*side*/ "no"
    );

    const benVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "0x0ceeed31E39a896CB5f69f1a05c013a7840A5f78",
      /*side*/ "no"
    );
    const louisVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "0x0cea312808EdcdC905428D3922480930689F4500",
      /*side*/ "no"
    );
    const thibautVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164",
      /*side*/ "yes"
    );
    const ignaciusVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C",
      /*side*/ "yes"
    );

    const mergeStatus = await getVoteStatus(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    assert.equal(michaelVote, 201, "Fail to add Michael's vote to database");
    assert.equal(voteYesTotals50000, "50000", "Fail to add votes yes.");
    assert.equal(voteNoTotals0, "0", "Fail to add votes no.");
    assert.equal(openStatus, "open", "Fail to stay open.");
    assert.equal(gabrielVote, 201, "Fail to add vote to database");
    assert.equal(magdaVote, 201, "Fail to add vote to database");
    assert.equal(thomasVote, 201, "Fail to add vote to database");
    assert.equal(benVote, 201, "Fail to add vote to database");
    assert.equal(louisVote, 201, "Fail to add vote to database");
    assert.equal(thibautVote, 201, "Fail to add vote to database");
    assert.equal(ignaciusVote, 201, "Fail to add vote to database");
    assert.equal(
      mergeStatus,
      "merge",
      "Fail to merge even though it was voted in."
    );
  });
});
