import './rewardYearTable.scss';

export const RewardYearTable = ({ years }) => {
    return (
        <div className='rewardYearTable'>
            <table border="1" style={{ width: "100%", textAlign: "center", marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>Year</th>
                        {[
                            "January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                        ].map((month) => (
                            <th key={month}>{month}</th>
                        ))}
                        <th>Total Rewards</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(years).map(([year, data]) => (
                        <tr key={year}>
                            <td><strong>{year}</strong></td>
                            {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ].map((month) => (
                                <td key={month}>
                                    {data.months[month] ? data.months[month].rewards : "-"}
                                </td>
                            ))}
                            <td><strong>{data.totalYearlyRewards}</strong></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
